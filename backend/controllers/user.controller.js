import { Webhook } from 'svix';
import User from '../models/user.model.js'; // your User model
import transactionModel from '../models/transactions.model.js';
import Stripe from "stripe"
// Clerk Webhook     
import connectDb from '../config/mongodb.js'; // Ensure path is correct

const clerkWebhook = async (req, res) => {
    try {
        // 1. Force Database Connection
        await connectDb();

        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
        if (!WEBHOOK_SECRET) {
            throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
        }

        // 2. Get the headers
        const svix_id = req.headers["svix-id"];
        const svix_timestamp = req.headers["svix-timestamp"];
        const svix_signature = req.headers["svix-signature"];

        // 3. Verify Signature with the RAW body
        const wh = new Webhook(WEBHOOK_SECRET);
        let evt;

        try {
            // We stringify the body to match the raw format Clerk sent
            evt = wh.verify(JSON.stringify(req.body), {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            });
        } catch (err) {
            console.error('❌ Error verifying webhook:', err.message);
            return res.status(400).json({ success: false, message: 'Verify Error' });
        }

        const { data, type } = evt;
        console.log(`✅ Webhook verified. Type: ${type}`);

        // 4. Perform Database Actions
        if (type === 'user.created') {
            const newUser = await User.create({
                clerkId: data.id,
                email: data.email_addresses[0].email_address,
                firstName: data.first_name,
                lastName: data.last_name,
                photo: data.image_url,
                creditBalance: 5
            });
            console.log("✅ User created in Atlas:", newUser.clerkId);
            return res.status(201).json({ success: true });
        }

        if (type === 'user.updated') {
            await User.findOneAndUpdate({ clerkId: data.id }, {
                email: data.email_addresses[0].email_address,
                firstName: data.first_name,
                lastName: data.last_name,
                photo: data.image_url
            });
            return res.status(200).json({ success: true });
        }

        if (type === 'user.deleted') {
            await User.findOneAndDelete({ clerkId: data.id });
            return res.status(200).json({ success: true });
        }

        return res.status(200).json({ success: true, message: "Event ignored" });

    } catch (error) {
        console.error("❌ CRITICAL WEBHOOK ERROR:", error.message);
        return res.status(500).json({ success: false, message: "Internal Error" });
    }
};
// Get user credits
const userCredits = async (req, res) => {
    try {
        const userId = req.body.clerkId;
        
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            console.log("No user found with that ID in the database.");
            return res.status(404).json({ success: false, message: "User not found" });
        } 

        res.json({ success: true, credits: user.creditBalance });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

///stripe payment
// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);

// API to make payment for credits (Stripe)
const paymentStripe = async (req, res) => {
    try {
        const { clerkId, planId } = req.body;
        
        const user = await User.findOne({ clerkId });

        if (!user || !planId) {
            return res.json({ success: false, message: "Missing Details" });
        }

        let credits, plan, amount;

        // Plan Selection Logic
        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;
            case 'Business':
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.json({ success: false, message: "Invalid Plan" });
        }

        const date = Date.now();

        // 1. Create Transaction in your MongoDB
        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date,
            payment: false // Remains false until webhook confirms success
        };

        const newTransaction = await transactionModel.create(transactionData);

        // 2. Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe works in cents ($10 = 1000)
            currency: 'usd',
            metadata: { 
                transactionId: newTransaction._id.toString(),
                clerkId: clerkId
            },
        });

        res.json({ 
            success: true, 
            clientSecret: paymentIntent.client_secret,
            transactionId: newTransaction._id 
        });

    } catch (error) {
        console.error("Stripe Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// controllers/user.controller.js

const verifyStripePayment = async (req, res) => {
    try {
        const { paymentIntent } = req.body;

        // 1. Retrieve the payment details from Stripe
        const intent = await stripe.paymentIntents.retrieve(paymentIntent);

        // 2. Check if the payment was successful
        if (intent.status === 'succeeded') {
            const { transactionId, clerkId } = intent.metadata;

            // 3. Check if we already processed this (to prevent double credits)
            const transaction = await transactionModel.findById(transactionId);
            
            if (transaction && !transaction.payment) {
                // 4. Mark as paid and add credits
                transaction.payment = true;
                await transaction.save();

                await User.findOneAndUpdate(
                    { clerkId: clerkId },
                    { $inc: { creditBalance: transaction.credits } }
                );

                return res.json({ success: true, message: "Credits added" });
            } else {
                return res.json({ success: true, message: "Already processed" });
            }
        }

        res.json({ success: false, message: "Payment not verified" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// controllers/user.controller.js
const verifyStripe = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;

        // 1. Retrieve the actual intent from Stripe API
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        // 2. Check if Stripe says 'succeeded'
        if (paymentIntent.status === 'succeeded') {
            
            // These metadata values were set in your paymentStripe function
            const { transactionId, clerkId } = paymentIntent.metadata;

            // 3. Find the transaction in your database
            const transaction = await transactionModel.findById(transactionId);

            // 4. Update only if not already paid (Security check)
            if (transaction && !transaction.payment) {
                transaction.payment = true;
                await transaction.save();

                // 5. Increment user's creditBalance
                const updatedUser = await User.findOneAndUpdate(
                    { clerkId: clerkId },
                    { $inc: { creditBalance: transaction.credits } },
                    { new: true }
                );

                return res.json({ 
                    success: true, 
                    message: "Credits added", 
                    newBalance: updatedUser.creditBalance 
                });
            } else {
                return res.json({ success: true, message: "Already processed" });
            }
        }

        res.json({ success: false, message: "Payment not verified" });

    } catch (error) {
        console.error("Verification Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
export { clerkWebhook, userCredits, paymentStripe,verifyStripePayment,verifyStripe};
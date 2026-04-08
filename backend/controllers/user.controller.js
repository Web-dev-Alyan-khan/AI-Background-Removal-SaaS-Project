import { Webhook } from "svix";
import userModel from "../models/user.model.js";
import Stripe from 'stripe';
import transactionModel from '../models/transactions.model.js';

// API Controller Function to manage Clerk User with database
const clerkWebhooks = async (req, res) => {
    try {
        // 1. Create a Svix instance with your secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // 2. Verify the headers (Svix needs the raw body and specific headers)
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        // 3. Extract data and event type
        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                    creditBalance: 5 // Default credits
                };

                await userModel.create(userData);
                console.log(`User Created: ${data.id}`);
                res.json({ success: true });
                break;
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                };

                await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
                console.log(`User Updated: ${data.id}`);
                res.json({ success: true });
                break;
            }

            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id });
                console.log(`User Deleted: ${data.id}`);
                res.json({ success: true });
                break;
            }

            default:
                res.status(400).json({ success: false, message: "Unhandled event type" });
                break;
        }

    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API Controller function to get user available credits data
const userCredits = async (req, res) => {
    try {
        const { clerkId } = req.body;

        // 1. Validate if clerkId was provided
        if (!clerkId) {
            return res.status(400).json({ success: false, message: "Clerk ID is required" });
        }

        // 2. Find the user in the database
        const userData = await userModel.findOne({ clerkId });

        // 3. Handle case where user isn't found
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 4. Return the actual credit balance from the database
        res.json({ 
            success: true, 
            credits: userData.creditBalance
        }); 

    } catch (error) {
        console.error(" Error fetching credits:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentStripe = async (req, res) => {
    try {
        const { clerkId, planId } = req.body;
        const { origin } = req.headers; // Automatically gets http://localhost:5173

        const user = await userModel.findOne({ clerkId });

        if (!user || !planId) {
            return res.json({ success: false, message: "Missing details" });
        }

        let credits, plan, amount;

        switch (planId) {
            case 'Basic':
                plan = 'Basic'; credits = 100; amount = 10; break;
            case 'Advanced':
                plan = 'Advanced'; credits = 500; amount = 50; break;
            case 'Business':
                plan = 'Business'; credits = 5000; amount = 250; break;
            default:
                return res.json({ success: false, message: "Invalid Plan" });
        }

        // 1. Create a pending transaction in your database
        const newTransaction = await transactionModel.create({
            clerkId, plan, amount, credits, payment: false
        });

        // 2. Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&resId=${newTransaction._id}`,
            cancel_url: `${origin}/buy`,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { 
                            name: `${plan} Plan`,
                            description: `Add ${credits} credits to your account`
                        },
                        unit_amount: amount * 100, // Cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: { 
                transactionId: newTransaction._id.toString(),
                clerkId 
            }
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Stripe Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

const verifyStripe = async (req, res) => {
    try {
        const { transactionId } = req.body;

        const transaction = await transactionModel.findById(transactionId);

        if (transaction && !transaction.payment) {
            // In a real production app, you would also verify the session status via Stripe API here
            transaction.payment = true;
            await transaction.save();

            const updatedUser = await userModel.findOneAndUpdate(
                { clerkId: transaction.clerkId },
                { $inc: { creditBalance: transaction.credits } },
                { new: true }
            );

            return res.json({ 
                success: true, 
                message: "Credits added", 
                newBalance: updatedUser.creditBalance 
            });
        }

        res.json({ success: false, message: "Payment already processed or not found" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export {clerkWebhooks,userCredits,verifyStripe,paymentStripe};
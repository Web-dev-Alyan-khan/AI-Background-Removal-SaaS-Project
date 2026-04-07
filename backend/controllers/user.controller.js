import { Webhook } from "svix";
import userModel from "../models/user.model.js";

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
        console.error("❌ Webhook Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export {clerkWebhooks};
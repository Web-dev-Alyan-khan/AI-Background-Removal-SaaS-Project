import { Webhook } from 'svix';
import User from '../models/user.model.js'; // Ensure path is correct


// http://localhost:3000/api/user/webhooks
const clerkWebhook = async (req, res) => {
    try {
        // 1. Verify the Webhook signature using Svix
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verification requires the raw body and headers
        await whook.verify(JSON.stringify(req.body), {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature']
        });

        const { data, type } = req.body;

        // 2. Handle Different Event Types
        switch (type) {
            case 'user.created': {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                    // creditBalance: 5 // Default credits for new users
                };

                await User.create(userData);
                console.log(`User Created: ${data.id}`);
                res.status(201).json({ success: true, message: 'User created' });
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                };

                await User.findOneAndUpdate({ clerkId: data.id }, userData);
                console.log(`User Updated: ${data.id}`);
                res.status(200).json({ success: true, message: 'User updated' });
                break;
            }

            case 'user.deleted': {
                await User.findOneAndDelete({ clerkId: data.id });
                console.log(`User Deleted: ${data.id}`);
                res.status(200).json({ success: true, message: 'User deleted' });
                break;
            }

            default:
                res.status(200).json({ success: true, message: 'Unhandled event type' });
                break;
        }

    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default clerkWebhook;
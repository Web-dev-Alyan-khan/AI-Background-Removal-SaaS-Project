import mongoose from 'mongoose';
import dns from 'dns';

// Fix: Use dots instead of commas
dns.setServers(['1.1.1.1', '8.8.8.8']);

const connectDb = async () => {
    try {
        // Use 'connected' instead of 'connect' for the event listener
        mongoose.connection.on('connected', () => {
            console.log('✅ MongoDB connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        // Ensure the URL exists before connecting
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables");
        }

        await mongoose.connect(`${process.env.MONGODB_URL}/AI-Background-Saas`);
        
    } catch (error) {
        console.error("FAILED to connect to DB:", error.message);
        // If it still fails, the issue is likely the IP Whitelist in Atlas
    }
};

export default connectDb;
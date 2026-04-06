import mongoose from 'mongoose';
import dns from 'dns';

// Fix: Use dots instead of commas
dns.setServers(['1.1.1.1', '8.8.8.8']);

// Track the connection state
let isConnected = false;

const connectDb = async () => {
    // 1. Prevent multiple heartbeat connections
    if (isConnected) {
        console.log('=> Using existing database connection');
        return;
    }

    // 2. Safety check for the Environment Variable
    if (!process.env.MONGODB_URL) {
        console.error("ERROR: MONGODB_URL is not defined in Vercel settings.");
        return;
    }

    try {
        // 3. Connect with a timeout to prevent Vercel "hanging"
        const db = await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 5000, // Fail fast if DB is down (5 seconds)
        });

        isConnected = db.connections[0].readyState;
        console.log('✅ MongoDB connected successfully');
        
    } catch (error) {
        console.error("❌ FAILED to connect to DB:", error.message);
        // Important: throw error so the Vercel function knows it failed
        throw error; 
    }
};

export default connectDb;
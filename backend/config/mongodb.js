import mongoose from 'mongoose';
import dns from 'dns';

// Fix: Use dots instead of commas
dns.setServers(['1.1.1.1', '8.8.8.8']);

const connectDb = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('✅ MongoDB connected successfully');
        });

        // Simply use the URL from .env. Don't add extra slashes or names here.
        await mongoose.connect(process.env.MONGODB_URL);
        
    } catch (error) {
        console.error("FAILED to connect to DB:", error.message);
    }
};

export default connectDb;
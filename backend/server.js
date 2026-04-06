import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import connectDb from './config/mongodb.js';
import userRouter from './routes/user.route.js';
import ImageRouter from './routes/image.route.js';
import { clerkMiddleware } from '@clerk/express';


const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
await connectDb();

// Middlewares
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ["https://ai-background-removal-saa-s-platfor-peach.vercel.app"] // Update this!
        : "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Clerk Middleware (populates req.auth)
app.use(clerkMiddleware());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/image', ImageRouter);

app.get('/', (req, res) => res.send('NexusAI Server Running'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
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
    origin: "http://localhost:5173", // your frontend
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
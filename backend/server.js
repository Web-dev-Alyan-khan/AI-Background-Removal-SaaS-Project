import 'dotenv/config'; // Loads variables from .env file
import express from "express";
import cors from "cors";
import connectDB from './config/db.js';
import userRouter from './routes/user.route.js';
import imageRouter from './routes/image.route.js';

const app = express();

// Initialize Database Connection
await connectDB();


// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Your Frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], // MUST include Authorization
    credentials: true
})); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running perfectly!",
  });
});

//api end point
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

// Define Port
const PORT = 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
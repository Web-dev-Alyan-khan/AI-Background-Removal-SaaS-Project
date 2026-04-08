import 'dotenv/config'; 
import express from "express";
import cors from "cors";
import connectDB from './config/db.js';
import userRouter from './routes/user.route.js';
import imageRouter from './routes/image.route.js';

const app = express();

// Initialize Database Connection
await connectDB();

// Professional CORS Setup
const allowedOrigins = [
  'http://localhost:5173', // Local Testing
  'https://ai-background-removal-saa-s-project-two.vercel.app' // Live Frontend
];

app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('CORS Policy: This origin is not allowed'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json()); 

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running perfectly on Vercel!",
  });
});

// API Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import 'dotenv/config'; // Loads variables from .env file
import express from "express";
import cors from "cors";
import connectDB from './config/db.js';

const app = express();

// Initialize Database Connection
await connectDB();

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running perfectly!",
  });
});

// Define Port
const PORT = 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
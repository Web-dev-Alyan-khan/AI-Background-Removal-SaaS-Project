import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import userRouter from './routes/user.route.js';
 

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

//database connect
await connectDb()

// Route
app.get('/', (req, res) => {
  res.send('Server running with nodemon ');
});

// API Routes
app.use('/api/user', userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
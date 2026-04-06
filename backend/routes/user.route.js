import express from 'express';
// We only import the single, robust verifyStripe function now
import { clerkWebhook, paymentStripe, userCredits, verifyStripe } from '../controllers/user.controller.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

// 1. Clerk Webhook (Must be POST and NOT protected by authUser)
userRouter.post('/webhooks', clerkWebhook);

// 2. Get User Credits (Changed to POST to match your controller's req.body.clerkId)
userRouter.post('/credits', authUser, userCredits);

// 3. Payment Initialization
userRouter.post('/pay-stripe', authUser, paymentStripe);

// 4. Verify Payment (Combined into one single route)
userRouter.post('/verify-stripe', authUser, verifyStripe);

export default userRouter; 
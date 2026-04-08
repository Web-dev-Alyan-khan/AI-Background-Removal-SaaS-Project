import express from 'express';
import { clerkWebhooks, paymentStripe, userCredits, verifyStripe } from '../controllers/user.controller.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/webhooks',clerkWebhooks);

//credits
userRouter.get('/credits',authUser,userCredits);

// Route to create a Stripe Payment Intent
userRouter.post('/pay-stripe', authUser, paymentStripe);

// Route to verify payment and add credits
userRouter.post('/verify-stripe', authUser, verifyStripe);
export default userRouter;
import express from 'express';
import { clerkWebhook, paymentStripe, userCredits, verifyStripe, verifyStripePayment } from '../controllers/user.controller.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhook);

//Protect credits route
userRouter.get('/credits', authUser, userCredits);

//payment
userRouter.post('/pay-stripe',authUser,paymentStripe)
// routes/user.route.js
userRouter.post('/verify-stripe', authUser, verifyStripePayment);
// routes/user.route.js
userRouter.post('/verify-stripe', authUser, verifyStripe);

export default userRouter;
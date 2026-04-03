import express from 'express';
import clerkWebhook from '../controllers/user.controller.js';


const userRouter = express.Router();

// The endpoint Clerk will hit: POST http://localhost:3000/api/user/webhooks
userRouter.post('/webhooks', clerkWebhook);

export default userRouter;
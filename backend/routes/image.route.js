import express from 'express';
import { removeBgImage } from '../controllers/image.controller.js';
import authUser from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const ImageRouter = express.Router();


ImageRouter.post('/remove-bg', upload.single('image'), authUser, removeBgImage);

export default ImageRouter;
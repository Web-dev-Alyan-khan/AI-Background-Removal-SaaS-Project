import express from "express"
import upload from "../middleware/multer.js"
import authUser from "../middleware/auth.js"
import { removeBgImage } from "../controllers/image.controller.js"


const imageRouter = express.Router()

imageRouter.post('/remove-bg',upload.single('image'),authUser,removeBgImage)

export default imageRouter
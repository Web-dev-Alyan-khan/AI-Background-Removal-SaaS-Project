import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/user.model.js";

const removeBgImage = async (req, res) => {
    try {
        const { clerkId } = req.body;
        const user = await userModel.findOne({ clerkId });
 
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // 1. Check if user has enough credits
        if (user.creditBalance <= 0) {
            return res.json({ 
                success: false, 
                message: "No credits left", 
                creditBalance: user.creditBalance 
            });
        }

        // 2. Get the uploaded image path from Multer
        const imagePath = req.file.path;

        // 3. Create Form Data for ClipDrop API
        const formData = new FormData();
        formData.append('image_file', fs.createReadStream(imagePath)); // Use ReadStream, not WriteStream

        // 4. Call ClipDrop API
        const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
                ...formData.getHeaders() // Necessary for multipart form data
            },
            responseType: 'arraybuffer'
        });

        // 5. Convert response to Base64
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

        // 6. Deduct 1 credit and update database
        await userModel.findByIdAndUpdate(user._id, { 
            creditBalance: user.creditBalance - 1 
        });

        // 7. Cleanup: Remove the temporary file from your server after processing
        fs.unlinkSync(imagePath);

        res.json({ 
            success: true, 
            resultImage, 
            creditBalance: user.creditBalance - 1, 
            message: "Background Removed Successfully" 
        });

    } catch (error) {
        console.error("Remove BG Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

export { removeBgImage };
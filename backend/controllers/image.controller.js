import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/user.model.js";

const removeBgImage = async (req, res) => {
    try {
        // FIX 1: Use clerkId from req.body (provided by your custom authUser middleware)
        const { clerkId } = req.body; 

        if (!clerkId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user ID provided" });
        }

        // FIX 2: Find user using clerkId
        const user = await userModel.findOne({ clerkId });

        if (!user) {
            return res.json({ success: false, message: "User not found in database" });
        }
        
        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: "No Credits Left", creditBalance: user.creditBalance });
        }

        // Ensure file exists (prevent crashes if Multer fails)
        if (!req.file) {
            return res.json({ success: false, message: "No image uploaded" });
        }

        const imagePath = req.file.path;
        const imageFile = fs.createReadStream(imagePath);

        const formData = new FormData();
        formData.append('image_file', imageFile);

        // Call ClipDrop API
        const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
                ...formData.getHeaders()
            },
            responseType: 'arraybuffer'
        });

        // Convert binary data to Base64
        const base64Image = Buffer.from(data).toString('base64');
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

        // Deduct credit and update DB
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

        // Delete the temporary file
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.json({ 
            success: true, 
            resultImage, 
            creditBalance: user.creditBalance - 1, 
            message: "Background Removed Successfully" 
        });

    } catch (error) {
        // If ClipDrop returns an error, it often shows up in error.response
        const errorMsg = error.response ? error.response.data.toString() : error.message;
        console.error("ClipDrop/Controller Error:", errorMsg);
        res.json({ success: false, message: "Failed to process image. Check API key/balance." });
    }
};

export { removeBgImage };
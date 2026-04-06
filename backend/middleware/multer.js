import multer from "multer";

// We switch from diskStorage to memoryStorage for Serverless compatibility
const storage = multer.memoryStorage();

const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit to prevent server timeouts
    }
});

export default upload;
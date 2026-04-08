import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        // Force initialize body
        req.body = req.body || {}; 

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "No Token" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.decode(token);

        if (!decoded || !decoded.sub) {
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }

        req.body.clerkId = decoded.sub;
        
       
        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        res.status(401).json({ success: false, message: "Auth Failed" });
    }
};

export default authUser;
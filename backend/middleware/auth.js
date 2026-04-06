// middleware/auth.js
const authUser = async (req, res, next) => {
    try {
        console.log("--- Auth Debug Start ---");
        
        // FIX: If req.auth is a function, call it. Otherwise, use it as an object.
        const authData = typeof req.auth === 'function' ? req.auth() : req.auth;
        
        const userId = authData?.userId;

        console.log("Extracted UserID:", userId); 

        if (!userId) {
            return res.status(401).json({ 
                success: false, 
                message: "Not Authorized. Please login again." 
            });
        }

        req.body = req.body || {};
        req.body.clerkId = userId;
        
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(401).json({ success: false, message: "Invalid Session" });
    }
};

export default authUser;
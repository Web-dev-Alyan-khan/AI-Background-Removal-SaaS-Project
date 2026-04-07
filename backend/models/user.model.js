import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {type: String,required: true,unique: true},
    email: {type: String,required: true,unique: true},
    photo: {ype: String,required: true},
    firstName: {type: String},
    lastName: {type: String},
    creditBalance: {type: Number,default: 5 }// Users start with 5 free credits
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Check if the model already exists to prevent errors during nodemon restarts
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
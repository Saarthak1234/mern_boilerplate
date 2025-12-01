import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    otp:{
        type:Number,
        expireAfterSeconds: 180,
        default:"",
    },
    githubId: {
        type: String,
        default: null,
    },
    googleId: {
        type: String,
        default: null,
    },
});

const User = mongoose.model("User", userSchema);
export default User;
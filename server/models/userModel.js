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
});

const User = mongoose.model("User", userSchema);
export default User;
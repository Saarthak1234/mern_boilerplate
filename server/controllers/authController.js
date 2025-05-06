import User from '../models/userModel.js';
import bcrypt, { getRounds } from 'bcryptjs';

function generateOtp(){
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    return generatedOtp;    
}

const signUp = async (req, res) => {
    const {name, email, password, isAdmin, userName} = req.body;
    const checkUserExists = await User.findOne({email});
    if (checkUserExists){
        console.log("User already exists");
        return res.status(400).json({message : "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if(!hashedPassword){
        console.log("Error hashing password");
        return res.status(500).json({message : "Error in hashing password"});
    }

    const user = new User({
        name,
        email,
        password : hashedPassword,
        userName,
        isAdmin: isAdmin || false,
    })

    const newUser = await user.save();
    return res.status(201).json({message : "User Successfully created", user: newUser});
}

const verifyOtp = async(req,res) =>{
    const {email,otp} = req.body;
    const user = await User.findOne({email});
     
    if(!user){
        console.log("User not found");
        return res.status(404).json({message : "User not found"});
    }

    const getGeneratedOtp = generateOtp();

    //Add sending otp to user email logic here

    if(otp !== getGeneratedOtp){
        console.log("Invalid OTP");
        return res.status(400).json({message : "Invalid OTP"});
    }    

    user.isVerified = true;
    const updatedUser = await user.save();
    return res.status(200).json({message : "User Successfully verified", user: updatedUser});
}

const login = async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        console.log("User not found");
        return res.status(404).json({message : "User not found"});
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        console.log("Invalid password");
        return res.status(400).json({message : "Invalid password"});
    }

    if(!user.isVerified){
        console.log("User not verified");
        return res.status(400).json({message : "User not verified"});
    }
}

export {signUp, verifyOtp, login};
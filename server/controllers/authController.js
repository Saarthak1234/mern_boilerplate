import User from '../models/userModel.js';
import bcrypt, { getRounds } from 'bcryptjs';

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();



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

    const otp = generateOtp();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: `
          <div style="font-family:sans-serif; text-align:center;">
            <h2>🔐 Your OTP Code</h2>
            <p>Use the following OTP to verify your email address:</p>
            <h1 style="color:#333;">${otp}</h1>
            <p>This code will expire in 3 minutes.</p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({message : "Error sending email"});
      }

    const user = new User({
        name,
        email,
        password : hashedPassword,
        userName,
        isAdmin: isAdmin || false,
        isVerified: false,
        otp
    })

    const newUser = await user.save();
    return res.status(201).json({message : "User Successfully created", user: newUser});
}

const verifyOtp = async(req,res) =>{
    const {email,otp} = req.body;
    const user = await User.findOne({email});

    console.log(user.otp);
     
    if(!user){
        console.log("User not found");
        return res.status(404).json({message : "User not found"});
    }

    if(otp != user.otp){
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

    return res.status(200).json({message : "User Successfully logged in", user});
}
const updateUser = async(req,res) =>{
    const {email, updatedUsername} = req.body;
    const user = await User.findOne({email});

    user.userName = updatedUsername;
    const updatedUser = await user.save();
    return res.status(200).json({message : "User Successfully updated", user: updatedUser});
}

const resendOtp =async(req,res) =>{
    const {email} = req.body;
    const user = await User.findOne({email});

    if(user.isVerified === true){
        console.log("User already verified");
        return res.status(400).json({message : "User already verified"});
    }

    const updatedOtp = generateOtp();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: `
          <div style="font-family:sans-serif; text-align:center;">
            <h2>🔐 Your OTP Code</h2>
            <p>Use the following OTP to verify your email address:</p>
            <h1 style="color:#333;">${updatedOtp}</h1>
            <p>This code will expire in 3 minutes.</p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({message : "Error sending email"});
      }

      user.otp = updatedOtp;
      const updatedUser = await user.save();
      return res.status(200).json({message : " Successfully updated", user: updatedUser});
}

export {signUp, verifyOtp, login, updateUser, resendOtp};
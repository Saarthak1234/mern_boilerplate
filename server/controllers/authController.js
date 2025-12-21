import User from '../models/userModel.js';
import bcrypt, { getRounds } from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import generateToken from "../utils/generateToken.js";
import dotenv from 'dotenv';
dotenv.config();



function generateOtp() {
  const generatedOtp = Math.floor(100000 + Math.random() * 900000);
  return generatedOtp;
}

const signUp = async (req, res) => {
  try {
    console.log("Signup request received with data:", req.body);
    const { name, email, password, userName } = req.body;
    const checkUserExists = await User.findOne({ email });
    if (checkUserExists) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      console.log("Error hashing password");
      return res.status(500).json({ message: "Error in hashing password" });
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
    console.log(otp);

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Error sending email" });
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
      userName,
      provider: "local",
      isVerified: false,
      otp
    })

    const newUser = await user.save();
    return res.status(201).json({ message: "User Successfully created", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  console.log(user.otp);

  if (!user) {
    console.log("User not found");
    return res.status(404).json({ message: "User not found" });
  }

  if (user.provider !== "local") {
    return res.status(400).json({
      message: "OTP verification not required for OAuth users",
    });
  }


  if (otp != user.otp) {
    console.log("Invalid OTP");
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.isVerified = true;
  const updatedUser = await user.save();
  return res.status(200).json({ message: "User Successfully verified", user: updatedUser });
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    provider: "local",   // ✅ ONLY local users
  }).select("+password"); // ✅ since password is select:false

  if (!user) {
    return res.status(404).json({
      message: "User not found or signed up using OAuth",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  if (!user.isVerified) {
    return res.status(400).json({ message: "User not verified" });
  }

  return res.status(200).json({
    message: "User Successfully logged in",
    user,
  });
};
const updateUser = async (req, res) => {
  const { email, updatedUsername } = req.body;
  const user = await User.findOne({ email });

  user.userName = updatedUsername;
  const updatedUser = await user.save();
  return res.status(200).json({ message: "User Successfully updated", user: updatedUser });
}

const resendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found");
    return res.status(404).json({ message: "User not found" });
  }

  if (user.provider !== "local") {
    return res.status(400).json({
      message: "OTP resend not applicable for OAuth users",
    });
  }


  if (user.isVerified === true) {
    console.log("User already verified");
    return res.status(400).json({ message: "User already verified" });
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
    return res.status(500).json({ message: "Error sending email" });
  }

  user.otp = updatedOtp;
  const updatedUser = await user.save();
  return res.status(200).json({ message: " Successfully updated", user: updatedUser });
}

const oauthSuccess = async (req, res) => {
  try {
    const user = req.user;
    // Generate JWT or session token
    const token = generateToken(user._id);
    res.status(200).json({
      message: "OAuth login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        isVerified: user.isVerified,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "OAuth error", error: error.message });
  }
};

const oauthFailure = (req, res) => {
  res.status(401).json({ message: "OAuth authentication failed" });
};

export { signUp, verifyOtp, login, updateUser, resendOtp, oauthSuccess, oauthFailure };
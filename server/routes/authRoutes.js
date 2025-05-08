import express from "express";

import {login, signUp, verifyOtp, updateUser, resendOtp} from "../controllers/authController.js";

const router = express.Router();
 
router.post("/signup", signUp);
router.post("/login", login);
router.patch("/verify", verifyOtp);
router.patch("/update", updateUser);
router.patch("/resendotp", resendOtp);

export default router;
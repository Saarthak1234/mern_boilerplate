import express from "express";

import {login, signUp, verifyOtp, updateUser, resendOtp, oauthSuccess, oauthFailure} from "../controllers/authController.js";
import passport from "../utils/passport.js";

const router = express.Router();
 
router.post("/signup", signUp);
router.post("/login", login);
router.patch("/verify", verifyOtp);
router.patch("/update", updateUser);
router.patch("/resendotp", resendOtp);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/auth/oauth/failure" }), oauthSuccess);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/oauth/failure" }), oauthSuccess);

export default router;
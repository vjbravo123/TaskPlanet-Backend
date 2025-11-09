import express from "express";
import { login, sendotp, setPassword, verifyOtp } from "../controllers/emailAuthController.js";
const router = express.Router();


// ✅ Send OTP
router.post("/send-otp", sendotp );

// ✅ Verify OTP
router.post("/verify-otp", verifyOtp );

// ✅ Register user after OTP verified
router.post("/set-password",setPassword );

// ✅ Login
router.post("/login", login );

export default router;

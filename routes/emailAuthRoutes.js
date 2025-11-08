import express from "express";
import sgMail from "@sendgrid/mail";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();
let otpStore = {}; // Temporary store — consider Redis/DB in production

// Set SendGrid API key from .env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ✅ Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const passwordExists = !!existingUser.password;
    return res.json({
      userExists: true,
      passwordExists,
      message: passwordExists
        ? "User already registered. Enter password to continue."
        : "User exists via Google login. Please sign in with Google."
    });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM, // Verified sender in SendGrid
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    };

    await sgMail.send(msg);

    return res.json({
      message: "OTP sent to email",
      userExists: false
    });

  } catch (err) {
    console.error("SendGrid error:", err);
    return res.status(500).json({ error: "Error sending OTP" });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] !== otp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  return res.json({ message: "OTP Verified" });
});

// ✅ Register user after OTP
router.post("/set-password", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });

  const hashedPassword = await bcrypt.hash(password, 10);
  let existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ error: "User already exists" });

  const user = await User.create({
    email,
    password: hashedPassword,
    name: name || email.split("@")[0],
    picture: "https://i.pravatar.cc/150",
    provider: "email"
  });

  delete otpStore[email];

  const userResponse = await User.findById(user._id).select("-password");
  return res.json(userResponse);
});

export default router;

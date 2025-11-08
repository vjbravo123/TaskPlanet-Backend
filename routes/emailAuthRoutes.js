import express from "express";
import bcrypt from "bcryptjs";
import Brevo from "@getbrevo/brevo";
import User from "../models/user.js";
import { generateOtpEmail } from "../utils/OtpEmailTemplate.js";

const router = express.Router();

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

// ✅ Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const existingUser = await User.findOne({ email });

    // If user already registered
    if (existingUser && existingUser.password) {
      return res.json({
        userExists: true,
        passwordExists: true,
        message: "User already registered. Enter password to continue.",
      });
    }

    if (existingUser && existingUser.provider === "google") {
      return res.json({
        userExists: true,
        passwordExists: false,
        message: "User exists via Google login. Please sign in with Google.",
      });
    }

    // ✅ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Save OTP in user model (create if not exists)
    await User.findOneAndUpdate(
      { email },
      {
        otp,
        otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        name: email.split("@")[0],
        picture: "https://i.pravatar.cc/150",
        provider: "email",
      },
      { upsert: true, new: true }
    );

    // ✅ Send email via Brevo
    const sendSmtpEmail = {
      sender: { name: "TaskPlanet App", email: "vjoshii822@gmail.com" },
      to: [{ email }],
      subject: "🔐 Your TaskPlanet OTP Code",
      htmlContent: generateOtpEmail(otp),
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.json({
      message: "OTP sent successfully",
      userExists: !!existingUser,
    });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ error: "Error sending OTP" });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP required" });

  try {
    const user = await User.findOne({ email });
    if (!user || !user.otp)
      return res.status(400).json({ error: "OTP not found. Please resend." });

    // ✅ Check expiry
    if (user.otpExpiresAt < new Date()) {
      await User.updateOne({ email }, { $unset: { otp: 1, otpExpiresAt: 1 } });
      return res.status(400).json({ error: "OTP expired. Please resend." });
    }

    if (user.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });

    // ✅ OTP verified — clear it
    await User.updateOne({ email }, { $unset: { otp: 1, otpExpiresAt: 1 } });

    res.json({ message: "OTP Verified" });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Register user after OTP
router.post("/set-password", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.password)
      return res.status(400).json({ error: "User already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.name = name || user.name;
    user.provider = "email";
    await user.save();

    const userResponse = await User.findById(user._id).select("-password");

    res.json(userResponse);
  } catch (err) {
    console.error("Error setting password:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid password" });

    const safeUser = {
      _id: user._id,
      name: user.name,
      picture: user.picture,
      email: user.email,
      provider: user.provider,
    };

    res.json({ message: "Login successful", user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

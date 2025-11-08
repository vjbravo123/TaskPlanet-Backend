import express from "express";
import nodemailer from "nodemailer";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateOtpEmail } from "../utils/OtpEmailTemplate.js";

const router = express.Router();

let otpStore = {}; // Temporary store — for production move to DB or Redis

// ✅ Send OTP
// ✅ Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  // ✅ Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const passwordExists = !!existingUser.password;
    return res.json({
      userExists: true,
      passwordExists,
      message: passwordExists
        ? "User already registered. Enter password to continue."
        : "User exists via Google login. Please sign in with Google.",
    });
  }

  // ✅ Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    // ✅ Use Brevo SMTP for production
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // Brevo uses STARTTLS
      auth: {
        user: "9b1b45001@smtp-brevo.com", // your Brevo login
        pass: "4DJ6S2gtcNLkvEdA", // your Brevo SMTP password (API key)
      },
    });

    // ✅ Send OTP email
    await transporter.sendMail({
      from: `"TaskPlanet App" vjoshii822@gmail.com`, // Use your verified domain if possible
      to: email,
     subject: "🔐 Your TaskPlanet OTP Code",
     html: generateOtpEmail(otp),
    });

    return res.json({
      message: "OTP sent successfully",
      userExists: false,
    });
  } catch (err) {
    console.error("Error sending OTP:", err);
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

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const user = await User.create({
    email,
    password: hashedPassword,
    name: name || email.split("@")[0],
    picture: "https://i.pravatar.cc/150",
    provider: "email" // ✅ mark this as email provider user
  });

  delete otpStore[email];

  // ✅ Populate all fields, strip password before sending
  const userResponse = await User.findById(user._id).select("-password");

  return res.json(userResponse);
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ error: "User not found" });

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid password" });

    // ✅ Remove password before sending user
    const safeUser = {
      user: {
        _id: user._id,
        name: user.name,
        picture: user.picture,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v
    };

    return res.json({ message: "Login successful", user: safeUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

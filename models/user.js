import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: { type: String, unique: true },
    picture: String,
    provider: { type: String, default: "google" },
    otp: String,                // ✅ store temporary OTP
    otpExpiresAt: Date          // ✅ track OTP expiry
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

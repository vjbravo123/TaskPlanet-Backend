import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    picture: {
      type: String,
      default: "https://i.pravatar.cc/150", // default avatar
    },
    provider: {
      type: String,
      enum: ["google", "email"],
      default: "google",
    },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    isVerified: {
      type: Boolean,
      default: false, // becomes true only after OTP verification
    },
  },
  { timestamps: true }
);

// ✅ TTL index: delete unverified users 30 minutes after OTP expiry
userSchema.index(
  { otpExpiresAt: 1 },
  {
    expireAfterSeconds: 1800, // 30 minutes
    partialFilterExpression: { isVerified: false },
  }
);

export default mongoose.model("User", userSchema);

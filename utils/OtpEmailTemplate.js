// utils/otpEmailTemplate.js

export const generateOtpEmail = (otp) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 40px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
      <div style="background: linear-gradient(90deg, #007bff, #00c6ff); color: white; text-align: center; padding: 20px;">
        <h1 style="margin: 0; font-size: 24px;">TaskPlanet Verification</h1>
      </div>
      <div style="padding: 30px; text-align: center;">
        <p style="font-size: 16px; color: #333;">Hello 👋,</p>
        <p style="font-size: 16px; color: #333;">Use the following One-Time Password (OTP) to verify your email address for TaskPlanet:</p>
        <div style="margin: 25px 0;">
          <span style="display: inline-block; background-color: #007bff; color: white; font-size: 28px; letter-spacing: 5px; padding: 12px 24px; border-radius: 8px;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #555;">This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
        <p style="font-size: 14px; color: #999;">If you didn’t request this code, you can safely ignore this email.</p>
      </div>
      <div style="background: #f1f1f1; text-align: center; padding: 15px; font-size: 13px; color: #777;">
        © ${new Date().getFullYear()} TaskPlanet. All rights reserved.
      </div>
    </div>
  </div>
  `;
};

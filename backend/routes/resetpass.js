const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Signup = require("../models/signupModel");

// Function to generate a random token
const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sourabhkhandale@gmail.com", // Your Gmail email address
    pass: "Gmail@3991", // Your Gmail password
  },
});

// Route to handle forgot password request
router.post("/forget", async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate reset token
    const resetToken = generateToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send email with reset link
    const mailOptions = {
      to: user.email,
      from: "sourabhkhandale3991@email.com",
      subject: "Password Reset",
      text:
        `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://${req.headers.host}/reset-password/${resetToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error during forgot password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to handle password reset form submission
router.post("/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Find user by reset token and check if it's expired
    const user = await Signup.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Update user's password and reset token fields
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

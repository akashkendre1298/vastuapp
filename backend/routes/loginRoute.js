const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Signup = require("../models/signupModel");

const router = express.Router();

// Login route
router.post("/", async (req, res) => {
  // Changed route path to /login
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await Signup.findOne({ email }); // Changed to Signup

    if (!existingUser) {
      console.error("User not found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!passwordMatch) {
      console.error("Invalid password for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_KEY);
    res
      .status(200)
      .json({ message: "Login successful", userId: existingUser._id, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

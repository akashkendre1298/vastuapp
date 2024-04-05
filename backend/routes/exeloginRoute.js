const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Executive = require("../models/executiveModel");

// Executive Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const executive = await Executive.findOne({ email });

    if (!executive) {
      console.error("Executive not found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Comparing plain text password with hashed password (not recommended)
    if (password !== executive.password) {
      console.error("Invalid password for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { executiveId: executive._id },
      process.env.JWT_KEY
    );

    res.status(200).json({
      message: "Executive login successful",
      executiveId: executive._id,
      token,
    });
  } catch (error) {
    console.error("Error during executive login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

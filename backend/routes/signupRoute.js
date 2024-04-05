const express = require("express");
const Signup = require("../models/signupModel");
const bcryptjs = require("bcryptjs"); // Changed import to bcryptjs
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  // Changed route path to /signup
  try {
    const { firstname, lastname, email, phonenumber, password } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10); // Changed to bcryptjs

    const newUser = new Signup({
      firstname,
      lastname,
      email,
      phonenumber,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

router.get("/", async (req, res) => {
  try {
    const users = await Signup.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

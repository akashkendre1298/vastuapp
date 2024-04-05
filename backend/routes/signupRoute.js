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

// Route to get all users
router.get("/", async (req, res) => {
  try {
    // Find all users in the database
    const users = await Signup.find();

    // Return the users as JSON response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

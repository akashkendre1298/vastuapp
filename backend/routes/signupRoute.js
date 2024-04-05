const express = require("express");
const Signup = require("../models/signupModel");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await Signup.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, email, phonenumber, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

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

module.exports = router;



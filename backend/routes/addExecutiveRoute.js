const express = require("express");
const router = express.Router();
const Executive = require("../models/executiveModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await Executive.findOne({ email });

    if (!existingUser) {
      console.error("User not found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("Hashed Password in Database:", existingUser.password);

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      console.error("Incorrect password for email:", email);
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

// POST route to add a new executive
router.post("/", async (req, res) => {
  try {
    const { password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Replace plain text password with hashed password
    req.body.password = hashedPassword;

    const newExecutive = new Executive(req.body);
    const savedExecutive = await newExecutive.save();
    res.status(201).json({
      message: "Executive added successfully",
      executive: savedExecutive,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to retrieve all executives
router.get("/", async (req, res) => {
  try {
    const executives = await Executive.find();
    res.json(executives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// GET route to retrieve a specific executive
router.get("/:id", async (req, res) => {
  try {
    const executiveId = req.params.id;
    const executive = await Executive.findById(executiveId);
    if (!executive) {
      return res.status(404).json({ message: "Executive not found" });
    }
    res.json(executive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH route to modify executive information
router.patch("/:id", async (req, res) => {
  try {
    const executive = await Executive.findByIdAndUpdate(req.params.id);
    if (!executive) {
      return res.status(404).json({ message: "Executive not found" });
    }
    // Update only the fields that are present in the request body
    Object.assign(executive, req.body);
    const updatedExecutive = await executive.save();
    res.json(updatedExecutive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route to delete an executive
router.delete("/:id", async (req, res) => {
  try {
    const executive = await Executive.findByIdAndDelete(req.params.id);
    if (!executive) {
      return res.status(404).json({ message: "Executive not found" });
    }
    await executive.remove();
    res.json({ message: "Executive deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

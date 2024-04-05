const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Signup = require("../models/signupModel");

// Route to update executive information
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { email, phonenumber, password, lastname, firstname } = req.body;

    const user = await Signup.findByIdAndUpdate(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (email) {
      user.email = email;
    }
    if (phonenumber) {
      user.phonenumber = phonenumber;
    }
    if (lastname) {
      user.lastname = lastname;
    }
    if (firstname) {
      user.firstname = firstname;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();

    res
      .status(200)
      .json({ message: "User information updated successfully", user });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const Executive = require("../models/executiveModel");
const bcrypt = require("bcrypt");

const router = express.Router();

// // PUT route to update password by user ID
// router.put("/:userId", (req, res) => {
//   const userId = req.params.userId;
//   const { newPassword, confirmPassword } = req.body;

//   // Find the user in the database by ID
//   Executive.findById(userId)
//     .then((user) => {
//       // If user not found, return error
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       // Check if newPassword matches confirmPassword
//       if (newPassword !== confirmPassword) {
//         return res
//           .status(400)
//           .json({ error: "New password and confirm password do not match" });
//       }

//       // Update the password
//       user.password = newPassword;

//       // Save the updated user
//       return user.save();
//     })
//     .then(() => {
//       // Respond with success message
//       res.json({ message: "Password updated successfully" });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Error updating password" });
//     });
// });

// router.patch("/", async (req, res) => {
//   const { userId, currentPassword, newPassword } = req.body;
//   try {
//     const user = await Executive.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     const updatedUser = await Executive.findByIdAndUpdate(
//       userId,
//       { password: hashedPassword },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


router.patch("/", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const user = await Executive.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Please provide a valid email address" });
    }

    // Check if the old password provided matches the stored password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const updatedUser = await Executive.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;


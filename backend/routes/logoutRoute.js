const express = require("express");
const router = express.Router();

// Logout route
router.post("/", (req, res) => {
  res.status(200).json({ message: " User Logout successful" });
});

module.exports = router;

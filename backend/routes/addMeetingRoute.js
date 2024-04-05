const express = require("express");
const router = express.Router();
const Meeting = require("../models/addMeetingModel"); // Assuming Meeting model is imported

// Route to add a new meeting
router.post("/", async (req, res) => {
  try {
    const newMeeting = await Meeting.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Meeting has been added successfully",
      data: newMeeting,
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// Route to get all meetings
router.get("/", async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Route to delete a meeting by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!deletedMeeting) {
      return res
        .status(404)
        .json({ status: "error", message: "Meeting not found" });
    }
    res.json({
      status: "success",
      message: "Meeting deleted successfully",
      data: deletedMeeting,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Route to update a meeting by ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMeeting) {
      return res
        .status(404)
        .json({ status: "error", message: "Meeting not found" });
    }
    res.json({
      status: "success",
      message: "Meeting updated successfully",
      data: updatedMeeting,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Feedback = require("../models/addfeedbackModel");
const response = require("../functions/responce");
const AddNewClient = require("../models/addclientModel");
const newCase = require("../models/addcaseModel");

// POST route to save a feedback
router.post("/savefeedback", async (req, res) => {
  try {
    const { clientID, caseID, feedback } = req.body;

    // Validate required fields
    if (!clientID || !caseID || !feedback) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if client exists - Assuming Client model is imported
    const clientExists = await AddNewClient.findById(clientID);
    if (!clientExists) {
      return res.status(400).json({ error: "Client does not exist" });
    }

    // Check if case exists - Assuming Case model is imported
    const caseExists = await newCase.findById(caseID);
    if (!caseExists) {
      return res.status(400).json({ error: "Case does not exist" });
    }

    // Create feedback object
    const newFeedback = await Feedback.create({
      clientID,
      caseID,
      feedback,
    });

    // Send success response
    res.status(201).json(response(feedback, "Feedback has been saved", null));
  } catch (error) {
    // Handle errors
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// GET route to retrieve all saved feedback
router.get("/savefeedback", async (req, res) => {
  try {
    // Retrieve all feedback
    const allFeedback = await Feedback.find();

    // Send success response with feedback data
    res.status(200).json(allFeedback);
  } catch (error) {
    // Handle errors
    console.error("Error retrieving feedback:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// GET route to retrieve a specific feedback by ID
router.get("/savefeedback/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve feedback by ID
    const feedback = await Feedback.findById(id);

    // Check if feedback exists
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    // Send success response with feedback data
    res.status(200).json(feedback);
  } catch (error) {
    // Handle errors
    console.error("Error retrieving feedback:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// PATCH route to update a feedback by ID
router.patch("/savefeedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;

    // Check if feedback ID is provided
    if (!id) {
      return res.status(400).json({ error: "Feedback ID is required" });
    }

    // Update feedback by ID
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { feedback },
      { new: true }
    );

    // Check if feedback exists
    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    // Send success response with updated feedback
    res
      .status(200)
      .json(response(updatedFeedback, "Feedback has been updated", null));
  } catch (error) {
    // Handle errors
    console.error("Error updating feedback:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// DELETE route to delete a feedback by ID
router.delete("/savefeedback/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if feedback ID is provided
    if (!id) {
      return res.status(400).json({ error: "Feedback ID is required" });
    }

    // Delete feedback by ID
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    // Check if feedback exists
    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    // Send success response
    res.status(200).json(response(null, "Feedback has been deleted", null));
  } catch (error) {
    // Handle errors
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

module.exports = router;

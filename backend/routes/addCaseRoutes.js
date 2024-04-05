const express = require("express");
const router = express.Router();
const newCase = require("../models/addcaseModel");

// Array to store cases data
let cases = [];

router.post("/", async (req, res) => {
  try {
    // Extract the data from the request body
    const newData = req.body;

    // Create a new document using the newCase model
    const newDocument = new newCase(newData);

    // Save the new document to the database
    const savedDocument = await newDocument.save();

    // Add the saved document to the cases array
    cases.push(savedDocument);

    res
      .status(201)
      .json({ message: "Case added successfully", data: savedDocument });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to retrieve all cases added to the database
router.get("/", async (req, res) => {
  try {
    // Retrieve all cases from the database
    const allCases = await newCase.find();

    res.status(200).json({ data: allCases });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cases", error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const caseId = req.params.id;
    const updates = req.body;

    // Find the case by ID and update it in the database
    const updatedCase = await newCase.findByIdAndUpdate(caseId, updates, {
      new: true,
    });

    if (!updatedCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res
      .status(200)
      .json({ message: "Case updated successfully", data: updatedCase });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const caseId = req.params.id;

    // Find the case by ID in the database
    const foundCase = await newCase.findById(caseId);

    if (!foundCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json({ data: foundCase });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving case", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const caseId = req.params.id;

    // Find the case by ID and delete it from the database
    const deletedCase = await newCase.findByIdAndDelete(caseId);

    if (!deletedCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json({ message: "Case deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting case", error: error.message });
  }
});

router.get("/byClientId/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Find cases with the specified client ID in the database
    const casesByClientId = await newCase.find({ client_id: clientId });

    res.status(200).json({ data: casesByClientId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cases", error: error.message });
  }
});

module.exports = router;

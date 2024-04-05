const express = require("express");
const router = express.Router();
const Followup = require("../models/followupModel");

// Create a follow-up visit
router.post("/", async (req, res) => {
  try {
    const followup = new Followup(req.body);
    await followup.save();
    res.status(201).send({ message: "Follow-up added successfully", followup });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all follow-up visits
router.get("/", async (req, res) => {
  try {
    const followups = await Followup.find();
    res.send(followups);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific follow-up visit by ID
router.get("/:id", async (req, res) => {
  try {
    const followup = await Followup.findById(req.params.id);
    if (!followup) {
      return res.status(404).send({ message: "Follow-up not found" });
    }
    res.send(followup);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a follow-up visit by ID
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "clientID",
    "caseID",
    "visitDate",
    "visitTime",
    "visitMode",
    "details",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const followup = await Followup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!followup) {
      return res.status(404).send({ message: "Follow-up not found" });
    }

    res.send({ message: "Follow-up updated successfully", followup });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a follow-up visit by ID
router.delete("/:id", async (req, res) => {
  try {
    const followup = await Followup.findByIdAndDelete(req.params.id);
    if (!followup) {
      return res.status(404).send({ message: "Follow-up not found" });
    }
    res.send({ message: "Follow-up deleted successfully", followup });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

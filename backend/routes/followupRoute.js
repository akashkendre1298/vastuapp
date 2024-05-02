const express = require("express");
const router = express.Router();
const Followup = require("../models/followupModel");
// const addNewClient = require("../models/addclientModel");

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

// // Get all follow-up visits
// router.get("/", async (req, res) => {
//   try {
//     const followups = await Followup.find();
//     if (!followups || followups.length === 0) {
//       return res.status(404).send({ message: "No follow-up visits found" });
//     }

//     const newFollowups = [];

//     for (let followup of followups) {
//       let clientFirstName = "";
//       let clientLastName = "";

//       try {
//         const customer = await addNewClient.findById(followup.clientID);
//         clientFirstName = customer.firstName;
//         clientLastName = customer.lastName;
//       } catch (error) {
//         console.error("Error finding customer:", error);
//       }

//       const newFollowup = {
//         ...followup._doc,
//         clientFirstName,
//         clientLastName,
//       };

//       newFollowups.push(newFollowup);
//     }

//     res.send(newFollowups);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

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
    "title",
    "clientID",
    "clientName",
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

// Get by client ID
router.get("/client/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const consultations = await Followup.find({ clientID: clientId });
    res.json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get by executive ID
router.get("/executive/:executiveId", async (req, res) => {
  try {
    const executiveId = req.params.executiveId;
    const consultations = await Followup.find({ exeID: executiveId });
    res.json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const AddSample = require("../models/addNewClinentModel");

// // Array to store clients data
// let clients = [];

// router.post("/", async (req, res) => {
//   try {
//     // Extract the data from the request body
//     const newData = req.body;

//     // Create a new document using the addSampleClient model
//     const newDocument = new AddSample(newData);

//     // Save the new document to the database
//     const savedDocument = await newDocument.save();

//     // Add the saved document to the clients array
//     clients.push(savedDocument);

//     res
//       .status(201)
//       .json({ message: "Data added successfully", data: savedDocument });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // GET route to retrieve data with specific exeId
// router.get("/exe/:exeId", async (req, res) => {
//   try {
//     // Extract the exeId from the URL parameters
//     const exeId = req.params.exeId;

//     // Fetch all documents with the specified exeId from the database
//     const matchingData = await AddSample.find({ exeId: exeId });

//     res.status(200).json({ data: matchingData });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error retrieving data", error: error.message });
//   }
// });

// // GET route to retrieve all data
// router.get("/", async (req, res) => {
//   try {
//     // Fetch all documents from the database
//     const allData = await AddSample.find();

//     res.status(200).json({ data: allData });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error retrieving data", error: error.message });
//   }
// });

// // GET route to retrieve specific client by ID
// router.get("/:id", async (req, res) => {
//   try {
//     // Extract client ID from request parameters
//     const clientId = req.params.id;

//     // Fetch the client document by ID
//     const client = await AddSample.findById(clientId);

//     // If client is found, send it in the response
//     if (client) {
//       res.status(200).json({ data: client });
//     } else {
//       res.status(404).json({ message: "Client not found" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error retrieving client", error: error.message });
//   }
// });

// // PATCH route
// router.patch("/:id", async (req, res) => {
//   try {
//     const client = await AddSample.findByIdAndUpdate(req.params.id);
//     if (!client) {
//       return res.status(404).json({ message: "Client not found" });
//     }
//     // Update only the fields that are present in the request body
//     Object.assign(client, req.body);
//     const updatedClient = await client.save();
//     res.json(updatedClient);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // DELETE route to delete specific client by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     // Extract client ID from request parameters
//     const clientId = req.params.id;

//     // Find the client document by ID and delete it
//     const deletedClient = await AddSample.findByIdAndDelete(clientId);

//     // If client is found and deleted, send success message
//     if (deletedClient) {
//       res.status(200).json({ message: "Client deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Client not found" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting client", error: error.message });
//   }
// });

// module.exports = router;

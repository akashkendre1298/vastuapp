const express = require("express");
const router = express.Router();
const AddNewClient = require("../models/addclientModel");
const { parse, format } = require("date-fns");

// // POST route
// // POST route to add a new executive
// router.post("/", async (req, res) => {
//   try {
//     const newClient = new AddNewClient(req.body);
//     const savedClient = await newClient.save();
//     res.status(201).json({
//       message: "Client added successfully",
//       client: savedClient,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // GET route
// router.get("/", async (req, res) => {
//   try {
//     const clients = await AddNewClient.find();
//     res.json(clients);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // GET route
// router.get("/:id", async (req, res) => {
//   try {
//     const clientid = req.params.id;
//     const clients = await AddNewClient.findById(clientid);
//     res.json(clients);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //get by exeId
// // Endpoint to retrieve data with specific exeId
// router.get("/data/:exeId", (req, res) => {
//   const exeId = req.params.exeId; // Retrieve exeId from URL parameters
//   const filteredData = data.filter((entry) => entry.exeId === exeId);

//   res.json(filteredData);
// });

// // router.get("/", (req, res) => {
// //   const exeId = req.query.exeId;
// //   console.log("Requested exeId:", exeId);

// //   // Filter clients by the provided exeId
// //   const matchedClients = AddNewClient.filter(
// //     (client) => client.exeId === exeId
// //   );
// //   console.log("Matched Clients:", matchedClients);

// //   if (matchedClients.length > 0) {
// //     res.json(matchedClients);
// //   } else {
// //     res
// //       .status(404)
// //       .json({ message: "No clients found for the provided exeId" });
// //   }
// // });

// // Route to get data based on exeId
// // router.get('/:exeId', (req, res) => {
// //     const { exeId } = req.params;

// //     const filteredData = AddNewClient.filter((item) => item.exeId === exeId);
// //     res.json(filteredData);
// // });

// // PATCH route
// router.patch("/:id", async (req, res) => {
//   try {
//     const client = await AddNewClient.findByIdAndUpdate(req.params.id);
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

// // DELETE route
// router.delete("/:id", async (req, res) => {
//   try {
//     const clientId = req.params.id;
//     const deletedCllient = await AddNewClient.findByIdAndDelete(clientId);
//     res.json({ message: "Client deleted Succesfully" });
//   } catch (e) {
//     res.status(404).json({ message: "INternal server Error" });
//   }
// });

// module.exports = router;

// Array to store clients data
let clients = [];

router.post("/", async (req, res) => {
  try {
    // Extract the data from the request body
    const newData = req.body;

    // Create a new document using the addSampleClient model
    const newDocument = new AddNewClient(newData);

    // Save the new document to the database
    const savedDocument = await newDocument.save();

    // Add the saved document to the clients array
    clients.push(savedDocument);

    res
      .status(201)
      .json({ message: "Data added successfully", data: savedDocument });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to retrieve data with specific exeId
router.get("/exe/:exeId", async (req, res) => {
  try {
    // Extract the exeId from the URL parameters
    const exeId = req.params.exeId;

    // Fetch all documents with the specified exeId from the database
    const matchingData = await AddNewClient.find({ exeId: exeId });

    res.status(200).json({ data: matchingData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving data", error: error.message });
  }
});

// GET route to retrieve all data
router.get("/", async (req, res) => {
  try {
    // Fetch all documents from the database
    const allData = await AddNewClient.find();

    res.status(200).json({ data: allData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving data", error: error.message });
  }
});

// GET route to retrieve specific client by ID
router.get("/:id", async (req, res) => {
  try {
    // Extract client ID from request parameters
    const clientId = req.params.id;

    // Fetch the client document by ID
    const client = await AddNewClient.findById(clientId);

    // If client is found, send it in the response
    if (client) {
      res.status(200).json({ data: client });
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving client", error: error.message });
  }
});

// PATCH route
router.patch("/:id", async (req, res) => {
  try {
    const client = await AddNewClient.findByIdAndUpdate(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    // Update only the fields that are present in the request body
    Object.assign(client, req.body);
    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route to delete specific client by ID
router.delete("/:id", async (req, res) => {
  try {
    // Extract client ID from request parameters
    const clientId = req.params.id;

    // Find the client document by ID and delete it
    const deletedClient = await AddNewClient.findByIdAndDelete(clientId);

    // If client is found and deleted, send success message
    if (deletedClient) {
      res.status(200).json({ message: "Client deleted successfully" });
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting client", error: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const addProduct = require("../models/addProductModel");

// POST endpoint to add a product for a specific executive and client
router.post("/", async (req, res) => {
  try {
    const { clientID, CaseID, exeID, productName, productCategory } = req.body;
    const newProduct = new addProduct({
      clientID,
      CaseID,
      exeID,
      productName,
      productCategory,
    });
    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    console.error("Error while adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint to retrieve all products for a specific executive and client
router.get("/:clientID/:exeID", async (req, res) => {
  try {
    const { clientID, exeID } = req.params;

    // Find all products for the specified clientID and exeID
    const products = await addProduct.find({ clientID, exeID });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error while fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint to retrieve all products
router.get("/", async (req, res) => {
  try {
    // Find all products
    const products = await addProduct.find();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error while fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

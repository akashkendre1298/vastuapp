const express = require("express");
const router = express.Router();
const addProduct = require("../models/addProductModel");

// POST endpoint to add a product for a specific executive and client
router.post("/", async (req, res) => {
  try {
    const {
      clientID,
      CaseID,
      exeID,
      productName,
      productCategory,
      priority,
      purchased,
      paymentStatus,
    } = req.body;

    const priorityValue = priority === "on" ? false : true;
    const purchasedValue = purchased === "on" ? false : true;
    //new product instance
    const newProduct = new addProduct({
      clientID,
      CaseID,
      exeID,
      productName,
      productCategory,
      priority: priorityValue,
      purchased: purchasedValue,
      paymentStatus,
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

// GET endpoint to retrieve all products for a specific case and client
router.get("/:clientID/:CaseID", async (req, res) => {
  try {
    const { clientID, CaseID } = req.params;
    const products = await addProduct.find({ clientID, CaseID });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error while fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.patch("/purchased", async (req, res) => {
  try {
    const { ids } = req.body;
    const updateProduct = await addProduct.updateMany(
      { _id: { $in: ids } }, 
      { $set: { purchased: true } }
    );
    res.status(200).json({ message: "Products updated successfully", updateProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/unPurchased", async (req, res) => {
  try {
    const { ids } = req.body;
    const updateProduct = await addProduct.updateMany(
      { _id: { $in: ids } }, 
      { $set: { purchased: false } }
    );
    res.status(200).json({ message: "Products updated successfully", updateProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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

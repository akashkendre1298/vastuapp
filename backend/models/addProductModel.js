const mongoose = require("mongoose");

const addProductSchema = new mongoose.Schema({
  clientID: {
    type: String,
    required: true,
  },
  CaseID: {
    type: String,
    required: true,
  },
  exeID: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
});

const addProduct = mongoose.model("addProduct", addProductSchema);

module.exports = addProduct;

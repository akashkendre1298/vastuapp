const mongoose = require("mongoose");

const addProductSchema = new mongoose.Schema({
  clientID: {
    type: String,
   
  },
  CaseID: {
    type: String,
    
  },
  exeID: {
    type: String,
    
  },
  productName: {
    type: String,
    
  },
  productCategory: {
    type: String,
   
  },
});

const addProduct = mongoose.model("addProduct", addProductSchema);

module.exports = addProduct;

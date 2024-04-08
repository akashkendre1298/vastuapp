const mongoose = require("mongoose");

const executiveSchema = new mongoose.Schema({
  firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
    
  },
  email: {
    type: String,
    
    
  },
  phoneNumber: {
    type: String,
   
  },
  address: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  password: {
    type: String,
    
  },
});

const Executive = mongoose.model("Executive", executiveSchema);

module.exports = Executive;

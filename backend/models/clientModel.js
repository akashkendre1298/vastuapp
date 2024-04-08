const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  caseAssociated: {
    type: String,
   
  },
  joiningDate: {
    type: Date,
    
  },
  address: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  feedback: {
    type: String,
  },
  callDetails: {
    type: [
      {
        date: { type: Date, required: true },
        duration: { type: Number, required: true },
        remarks: { type: String },
      },
    ],
    default: [],
  },
});

// Create a model for the client schema
const NewClient = mongoose.model("NewClient", clientSchema);

module.exports = NewClient;

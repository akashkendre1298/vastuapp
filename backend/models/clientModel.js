const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  caseAssociated: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
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

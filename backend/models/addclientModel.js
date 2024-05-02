const mongoose = require("mongoose");

const addclientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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
  phoneNumber: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  },
  callDetails: {
    type: String,
  },
  image: {
    type: String, // storing the image in URL format
  },
  issues: {
    type: String,
  },
  exeId: {
    type: String,
    required: true,
  },
  exeName: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  refrance: {
    type: String,
  },
});

// Create a model for the client schema
const addNewClient = mongoose.model("addNewClient", addclientSchema);

module.exports = addNewClient;

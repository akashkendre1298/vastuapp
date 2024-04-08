const mongoose = require("mongoose");

const addclientSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: String,
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
  },
  exeName: {
    type: String,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
});

// Create a model for the client schema
const addNewClient = mongoose.model("addNewClient", addclientSchema);

module.exports = addNewClient;

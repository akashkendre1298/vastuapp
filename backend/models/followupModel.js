const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  clientID: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    // required: true,
  },
  caseID: {
    type: String,
    required: true,
  },
  visitDate: {
    type: String,
    required: true,
  },
  visitTime: {
    type: String,
    required: true,
  },
  visitMode: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  exeID: {
    type: String,
    required: true,
  },
});

const Followup = mongoose.model("Followup", visitSchema);

module.exports = Followup;

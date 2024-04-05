const mongoose = require("mongoose");

const newCaseSchema = new mongoose.Schema({
  caseLabel: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  executive: {
    type: String,
    required: true,
  },
  executiveID: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  issues: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  firstMeetingDate: {
    type: String,
    required: true,
  },
});

const newCase = mongoose.model("Cases", newCaseSchema);

module.exports = newCase;

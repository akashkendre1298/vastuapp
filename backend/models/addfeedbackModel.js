const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  clientID: {
    type: String,
    required: true,
  },
  caseID: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

const addFeedbackSchema = mongoose.model("addFeedback", feedbackSchema);

module.exports = addFeedbackSchema;

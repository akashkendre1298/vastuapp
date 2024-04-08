const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  clientID: {
    type: String,
    
  },
  caseID: {
    type: String,
    
  },
  feedback: {
    type: String,
    
  },
});

const addFeedbackSchema = mongoose.model("addFeedback", feedbackSchema);

module.exports = addFeedbackSchema;

const mongoose = require("mongoose");

const newCaseSchema = new mongoose.Schema({
  caseLabel: {
    type: String,
  },
  client: {
    type: String,
    
  },
  client_id: {
    type: String,
   
  },
  executive: {
    type: String,
    
  },
  executiveID: {
    type: String,
    
  },
  image: {
    type: String,
    
  },
  issues: {
    type: String,
   
  },
  solution: {
    type: String,
    
  },
  payment: {
    type: String,
  
  },
  contactNumber: {
    type: String,
    
  },
  firstMeetingDate: {
    type: String,
    
  },
});

const newCase = mongoose.model("Cases", newCaseSchema);

module.exports = newCase;

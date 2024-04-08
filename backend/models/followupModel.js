const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  title: {
    type: String,
   
  },
  clientID: {
    type: String,
    
  },
  caseID: {
    type: String,
    
  },
  visitDate: {
    type: String,
    
  },
  visitTime: {
    type: String,
    
  },
  visitMode: {
    type: String,
   
  },
  details: {
    type: String,
    
  },
});

const Followup = mongoose.model("Followup", visitSchema);

module.exports = Followup;

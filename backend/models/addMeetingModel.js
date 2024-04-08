const mongoose = require("mongoose");

const newMeetingSchema = new mongoose.Schema({
  meetingTitle: {
    type: String,
    
  },
  executiveName: {
    type: String,
    
  },
  executiveID: {
    type: String,
    
  },
  executivesEmail: {
    type: String,
   
  },
  executiveName: {
    type: String,
    
  },
  clintID: {
    type: String,
    
  },
  clintName: {
    type: String,
   
  },
  meetingMode: {
    type: String,
    
  },
  date: {
    type: Date,
   
  },
  details: {
    type: String,
    
  },
});

const newMeeting = mongoose.model("Meeting-details", newMeetingSchema);

module.exports = newMeeting;

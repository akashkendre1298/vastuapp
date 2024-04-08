const mongoose = require("mongoose");

const newaddMeetingSchema = new mongoose.Schema({
  meetingTitle: {
    type: String,
    
  },
  executives: [
    {
      name: {
        type: String,
        
      },
      email: {
        type: String,
        
      },
    },
  ],
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

const addMeeting = mongoose.model("add-Meeting", newaddMeetingSchema);

module.exports = addMeeting;

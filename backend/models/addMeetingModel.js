const mongoose = require("mongoose");

const newMeetingSchema = new mongoose.Schema({
  meetingTitle: {
    type: String,
    required: true,
  },
  executiveName: {
    type: String,
    required: true,
  },
  executiveID: {
    type: String,
    required: true,
  },
  executivesEmail: {
    type: String,
    required: true,
  },
  executiveName: {
    type: String,
    required: true,
  },
  clintID: {
    type: String,
    required: true,
  },
  clintName: {
    type: String,
    required: true,
  },
  meetingMode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const newMeeting = mongoose.model("Meeting-details", newMeetingSchema);

module.exports = newMeeting;

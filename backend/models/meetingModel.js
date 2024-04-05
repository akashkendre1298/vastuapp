const mongoose = require("mongoose");

const newaddMeetingSchema = new mongoose.Schema({
  meetingTitle: {
    type: String,
    required: true,
  },
  executives: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  ],
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

const addMeeting = mongoose.model("add-Meeting", newaddMeetingSchema);

module.exports = addMeeting;

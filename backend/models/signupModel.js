const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  firstname: {
    type: String,
    
  },
  lastname: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  phonenumber: {
    type: String,
    
  },
  password: {
    type: String,
    
  },
});

const Signup = mongoose.model("Signup", listingSchema);

module.exports = Signup;

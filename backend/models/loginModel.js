const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    
  },

  password: {
    type: String,
    
  },
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;

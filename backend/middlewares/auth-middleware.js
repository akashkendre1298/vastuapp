const jwt = require("jsonwebtoken");
const Signup = require("../models/signupModel");
const response = require("../functions/responce");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    if (!token) {
      return res
        .status(401)
        .json(response(null, null, "forbidden :Token not found"));
    }
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(403)
        .json(response(null, null, "forbidden : Invalid token"));
    }
    res.status(500).json(response(null, null, error.message));
    console.log(error.message);
  }
};

module.exports = verifyToken;
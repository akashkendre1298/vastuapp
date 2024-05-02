const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const port = process.env.PORT || 8888;
const mongodbURI = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Define API Router
const apiRouter = express.Router();
app.use("/api", apiRouter);

// Handle routes here
// const signup = require("./routes/signupRoute");
// const login = require("./routes/loginRoute");
const adminsignup = require("./routes/adminAuthRoute");
const adminlogin = require("./routes/adminAuthRoute");
const forgetpass = require("./routes/resetpass");
// const executiveinfo = require("./routes/executiveRoute");
const addclient = require("./routes/addclientRoute");
const addexecutive = require("./routes/addExecutiveRoute");
const addfeedback = require("./routes/addFeedbackRoute");
const addmeeting = require("./routes/addMeetingRoute");
const addcases = require("./routes/addCaseRoutes");
const exelogin = require("./routes/exeloginRoute");
const followup = require("./routes/followupRoute");
const addnewclient = require("./routes/addNewClientRoute");
const addProduct = require("./routes/addProductRoute");
const updatepass = require("./routes/resetpass");
const report = require("./routes/reportRoute")

// Define API paths
apiRouter.use("/admin/signup", adminsignup);
apiRouter.use("/admin/login", adminlogin);
// apiRouter.use("/exe/signup", signup);
// apiRouter.use("/exe/login", login);
apiRouter.use("/exe/resetpass", forgetpass);
// apiRouter.use("/executiveinfo", executiveinfo);
apiRouter.use("/clients", addclient);
apiRouter.use("/executives", addexecutive);
apiRouter.use("/feedback", addfeedback);
apiRouter.use("/meetings", addmeeting);
apiRouter.use("/cases", addcases);
apiRouter.use("/exe", exelogin);
apiRouter.use("/followup", followup);
// apiRouter.use("/addnewclient", addnewclient);
apiRouter.use("/addproduct", addProduct);
apiRouter.use("/updatepasssword", updatepass);
apiRouter.use("/reports", report);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB !!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} !!!`);
});

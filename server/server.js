const express = require("express");
const app = express();
const path = require("path");
const authRoute = require("./auth/authRoute.js");
const verify = require("./verify.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const ejs = require("ejs");

dotenv.config(); //secret things

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

//middleware
app.use(
  express.static(
    "D:/Programming/Projects/Inkdrop project/Inkdrop project final/client"
  )
);
app.use(
  express.static(
    "D:/Programming/Projects/Inkdrop project/Inkdrop project final"
  )
);
app.use(express.json());
app.use(cors());

//import route route
app.use("/api/user", authRoute);

//view engine
app.set("view engine", "html");
app.engine("html", ejs.renderFile);
app.set("views", path.join(__dirname, "../client/views"));

app.get("/", verify, (req, res) => {
  res.send(true);
  console.log("requested get from client");
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/views/index.html"));
});

app.get("/favicon.ico", (req, res) => {
  res.send("favicon");
});

//authentication
app.listen(4000, () => console.log("listening on port 4000"));

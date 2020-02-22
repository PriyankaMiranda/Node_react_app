// import express
const express = require("express");
// import mogoose
const mongoose = require("mongoose");
// import keys
const keys = require("./config/keys");
//import models for db
require("./models/User");
//import local passport file
require("./services/passport");

// make an instance
const app = express();
//send app obj to authroutes for its function to be carried
require("./routes/authRoutes")(app);

mongoose.connect(keys.mongoURI);

// dynamically figure out which port to listen to
// Heroku injects runtime environment variable
//catch case(500) is for when we are testing in our local system
const PORT = process.env.PORT || 5000;
// specify port
app.listen(PORT);

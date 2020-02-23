// import express
const express = require("express");
// import mogoose
const mongoose = require("mongoose");
// import cookie-session
const cookieSession = require("cookie-session");
// import local passport
const passport = require("passport");
// import local keys
const keys = require("./config/keys");
// import models for db
require("./models/User");
// import local passport. not same as the previous passport
require("./services/passport");
// make an instance
const app = express();
// time taken should be written in milliseconds
app.use(
	cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey] })
);
app.use(passport.initialize());
app.use(passport.session());

// send app obj to authroutes for its function to be carried
require("./routes/authRoutes")(app);

//this is asynchronous. it doesnt wait for an order
mongoose
	.connect(keys.mongoURI)
	.then(() => {
		console.log("Connected to Database");
	})
	.catch(err => {
		console.log("Not Connected to Database ERROR! ", err);
	});

// dynamically figure out which port to listen to
// Heroku injects runtime environment variable
// catch case (500) is for when we are testing in our local system
const PORT = process.env.PORT || 5000;
// specify port
app.listen(PORT);

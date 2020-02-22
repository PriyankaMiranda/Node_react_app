// import express
const express = require("express");
// import passoprt and strategy
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// import keys
const keys = require("./config/keys");
// make an instance
const app = express();

//create instance of strategy and use it in passport obj
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback/"
		},
		(accessToken, refreshToken, profile, done) => {
			console.log("access token", accessToken);
			console.log("refresh token", refreshToken);
			console.log("profile", profile);
		}
	)
);

//route handler for auth/google/callback
//google strategy is identified as 'google' internally
//scope specifies what kind of access we want to have
app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"]
	})
);

//route handler for auth/google/callback
// we send it back to passport but this time we also send the code
// this was google cofirms the approval
app.get("/auth/google/callback", passport.authenticate("google"));
// dynamically figure out which port to listen to
// Heroku injects runtime environment variable
//catch case(500) is for when we are testing in our local system
const PORT = process.env.PORT || 5000;
// specify port
app.listen(PORT);

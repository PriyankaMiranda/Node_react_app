// import passoprt and strategy
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// import keys
const keys = require("../config/keys");
// import mongoose
const mongoose = require("mongoose");
//load an already defined collection from your mongodb
const User = mongoose.model("users");

//create instance of strategy and use it in passport obj
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback/"
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					//we already have an account with the id
					//first argument is to pass whther there are any errors
					done(null, existingUser);
				} else {
					//we will have to create a new record
					new User({ googleId: profile.id }).save().then(user => {
						done(null, user);
					});
				}
			});
		}
	)
);

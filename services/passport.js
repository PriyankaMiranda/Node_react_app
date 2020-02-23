// import passoprt and strategy
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// import keys
const keys = require("../config/keys");
// import mongoose
const mongoose = require("mongoose");
// load an already defined collection from your mongodb
const User = mongoose.model("users");
// after the below asynchronous operation is done, serialization is performed
// user contains the user info
// Remember! user.id isnt the user's id (googleId). it is the mongodb id randomly alloted to each record
// we can use  this as a cookie- it is our internal id.
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// deserialization. get the cookie data and get user record
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});
// create instance of strategy and use it in passport obj
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback/",
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					// we already have an account with the id
					// first argument is to pass whther there are any errors
					done(null, existingUser);
				} else {
					// we will have to create a new record
					new User({ googleId: profile.id }).save().then(user => {
						done(null, user);
					});
				}
			});
		}
	)
);

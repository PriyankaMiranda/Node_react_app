const passport = require("passport");
module.exports = app => {
	// route handler for auth/google/callback
	// google strategy is identified as 'google' internally
	// scope specifies what kind of access we want to have
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	// route handler for auth/google/callback
	// we send it back to passport but this time we also send the code
	// this was google cofirms the approval
	app.get(
		"/auth/google/callback",
		passport.authenticate("google", { scope: ["profile", "email"] })
	);

	// log out handler
	app.get("/api/logout", (req, res) => {
		req.logout();
		res.send(req.user);
	});

	// shows user data
	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});
};

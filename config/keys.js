if (process.env.NODE_ENV == "production") {
	// production mode
	module.exports = require("./prod");
} else {
	// developer mode
	module.exports = require("./dev");
}

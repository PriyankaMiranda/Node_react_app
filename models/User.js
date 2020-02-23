const mongoose = require("mongoose");
//mongoose obj has a property schema that is  saved to variable schema
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	name: String
});
// it creates a new collection called users with the following schema
mongoose.model("users", userSchema);

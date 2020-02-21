// import express
const express = require("express");
// make an instance
const app = express();
// function
app.get("/", (req, res) => {
	res.send({ hi: "there. Yay" });
});
// dynamically figure out which port to listen to
// Heroku injects runtime environment variable
//catch case(500) is for when we are testing in our local system
const PORT = process.env.PORT || 5000;
// specify port
app.listen(PORT);

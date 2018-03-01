const mongoose  = require("mongoose");

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	imageUrl: String,
	students: [ { type:mongoose.Schema.Types.ObjectId, ref: "Student"}]
});

module.exports = mongoose.model("User", userSchema);
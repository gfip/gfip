const mongoose  = require("mongoose");
	  passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	imageUrl: String,
	students: [ { type:mongoose.Schema.Types.ObjectId, ref: "Student"}]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
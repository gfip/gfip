const mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
	name: String,
	login: String,
	theHuxleyID: String,
	reports: [ { type:mongoose.Schema.Types.ObjectId, ref: "Report"}]
});

module.exports = mongoose.model("Student", studentSchema);
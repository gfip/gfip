const mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
	name: String,
	login: String,
	theHuxleyId: Number,
	reports: [ { type:mongoose.Schema.Types.ObjectId, ref: "Report"}]
});

module.exports = mongoose.model("Student", studentSchema);
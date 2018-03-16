const mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
	name: String,
	login: String,
	theHuxleyId: Number,
	reports: [ {
		listId: { type:mongoose.Schema.Types.ObjectId, ref: "Report"},
		problems: [{problem: {name:String , theHuxleyId: Number} , status:String, code: String }]
	}]
});

module.exports = mongoose.model("Student", studentSchema);
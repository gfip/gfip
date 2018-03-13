const mongoose = require("mongoose");

var reportSchema = mongoose.Schema({
	list: { type:mongoose.Schema.Types.ObjectId, ref: "List"},
	problems: [ { title: String, score: Number, status: String , comment: String }],
	comment: String
});

module.exports = mongoose.model("Report", reportSchema);
const mongoose = require ("mongoose");

var listSchema = mongoose.Schema({
	numberOfProblems: Number,
	listNumber: Number,
	theme: String
});

module.exports = mongoose.model("List", listSchema);

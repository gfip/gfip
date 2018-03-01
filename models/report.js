const mongoose = require("mongoose");

var reportSchema = mongoose.Schema({
	title: String,
	problems: [ { title: String, score: Number, status: String }]
});

module.exports = mongoose.model("Report", reportSchema);
const mongoose = require("mongoose");

var reportSchema = mongoose.Schema({
	list: {title: String, theHuxleyId: Number, totalScore: Number, endDate:String},
	submissions: [ 
		{ 
			problem: {
				name: String,
				score: Number			
			},
			evaluation: String,
			comment: String,
		}
	],
	finalComment: String
});

module.exports = mongoose.model("Report", reportSchema);
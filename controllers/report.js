var Student = require("../models/student.js");
var Report  = require("../models/report.js");


module.exports = {

	getReports : function(req, res){
		Student.findById( req.params.student_id).populate("reports").exec()
		.then( (foundStudent) => {
				res.send(foundStudent.reports);
			}).catch( (err) => {
				console.log(err);
			});
	},


	createReport: function(req, res){
		Student.findById(req.params.student_id).then((foundStudent) => Report.create(req.body.report).then(
			(createdReport) =>{
				foundStudent.reports.push(createdReport._id);
				foundStudent.save();
				return res.send(foundStudent.reports);
			}
		)).catch((err) =>{
			return console.log(err);
		})	
	},

	deleteReport : function(req, res){
		Student.findById(req.params.student_id).then((foundStudent) => Report.findByIdAndRemove(req.params.report_id).then(
			(deletedReport) =>{
				foundStudent.reports.splice(foundStudent.reports.indexOf(deletedReport._id));
				foundStudent.save();
				return res.send(foundStudent.reports);
			}
		)).catch((err) =>{
			return console.log(err);
		})	
	},

	showReport: function(req, res){
		Report.findById(req.params.report_id).then(
			(foundReport) =>{
				return res.send(foundReport);
			}
		).catch( (err) =>{
			return console.log(err);
		})

	},

	updateReport : function(req, res){
		Report.findByIdAndUpdate(req.params.report_id, req.body.report ).then(
			(updatedReport) => {
				return res.send(updatedReport);
			}
		).catch( (err) =>{
			return console.log(err);
		})


	}


}
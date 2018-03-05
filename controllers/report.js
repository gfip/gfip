var Student = require("../models/student.js");
var Report  = require("../models/report.js");


module.exports = {

	getReports : function(req, res){
		Student.findById( req.params.student_id).populate("reports").exec()
		.then( (foundStudent) => {
				return res.json(foundStudent.reports);
		}).catch( (err) => {
				return res.json({code: -1 , err : err});
		});
	},


	createReport: function(req, res){
		var report = {
			title: req.body.title
		}
		Student.findById(req.params.student_id).then((foundStudent) => Report.create(report)
		.then( (createdReport) =>{
				foundStudent.reports.push(createdReport._id);
				foundStudent.save();
				// send email here
				return res.json(createdReport);
			}
		)).catch((err) =>{
			return res.json({code: -1 , err : err});
		})	
	},

	deleteReport : function(req, res){
		Student.findById(req.params.student_id).then( (foundStudent) => Report.findByIdAndRemove(req.params.report_id)
		.then((deletedReport) => {
			foundStudent.reports.splice(foundStudent.reports.indexOf(req.params.report_id),1);
			foundStudent.save();
			return res.json(deletedReport);
		})).catch((err) =>{
			return res.json({code: -1 , err : err});
		})
	},

	showReport: function(req, res){
		Report.findById(req.params.report_id).then( (foundReport) =>{
			return res.json(foundReport);
		}).catch( (err) => {
			return res.json({code: -1 , err : err});
		});

	},

	updateReport : function(req, res){
		var updatedReport = {
			title : req.body.title
		}
		Report.findByIdAndUpdate(req.params.report_id, updatedReport).then( (foundReport) =>{
			return res.json({foundReport , updatedReport});
		}).catch( (err) => {
			return res.json({code: -1 , err : err});
		});


	}


}
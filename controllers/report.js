var Student = require("../models/student.js");
var Report  = require("../models/report.js");
var listController = require("./list.js");

module.exports = {

	getReports : async function(req, res){
		try {
			let foundStudent = await Student.findById(req.params.student_id).populate("reports").exec();
			res.json(foundStudent.reports);
		} catch(err){
			return res.json({code:-1, err:err.message});
		}
	},

	showStudentList: async function(req, res){
		try{
			let studentList = await listController.getStudentList(req.params.student_id, req.params.list_id);
			for(let i = 0; i < studentList.submissions.length; i++){
				let sub = studentList.submissions[i];
				if(sub.theHuxleyId === 0){
					sub.code = "";
				}else{
					sub.code =  await listController.getSubmissionCode(studentList.submissions[i].theHuxleyId);
				}
			}
			return res.json(studentList);
		}catch(err){
			return res.json({code:-1, err:err.message})
		}
	},


	createReport: async function(req, res){
		try {
				let studentList = await listController.getStudentList(req.params.student_id, req.params.list_id);
				let foundStudent = await Student.findById(req.params.student_id);
				let report = {
					list: studentList.list,
					submissions: []
				}
				for(var i = 0; i < studentList.submissions.length; i++){
					report.submissions.push({
						problem: {
							name : studentList.submissions[i].problem.name,
							score: studentList.submissions[i].problem.score
						} ,
						evaluation: studentList.submissions[i].evaluation,
						comment: req.body.comments[i]
					});
				}
				report.finalComment = req.body.finalComment;				
				let createdReport = await Report.create(report);
				foundStudent.reports.push(createdReport._id);
				let updatedStudent = await foundStudent.save();
				//send email here
				return res.json(createdReport);
		} catch(err){
			return res.json({code:-1, err:err.message});
		}
	},

	deleteReport : async function(req, res){
		try {
			let foundStudent = await Student.findById(req.params.student_id);
			let deletedReport = await Report.findByIdAndRemove(req.params.report_id);
			foundStudent.reports.splice(foundStudent.reports.indexOf(req.params.report_id), 1);
			let updatedStudent = await foundStudent.save();
			return res.json(deletedReport);
		} catch(err){
			return res.json({code:-1, err:err.message});
		}
	},

	showReport: async function(req, res){
		try {
			let foundReport = await Report.findById(req.params.report_id);
			return res.json(foundReport);
		} catch(err){
			return res.json({code:-1, err:err.message});
		}
	},

	updateReport : async function(req, res){
		try {
			let report = {
				title : req.body.title
			}
			let updatedReport = await Report.findByIdAndUpdate(req.params.report_id, report);
			return res.json(report);
		} catch(err){
			return res.json({code:-1, err:err.message});
		}
	}


}
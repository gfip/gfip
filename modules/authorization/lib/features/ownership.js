var User = require("../models/user.js");
var Student = require("../models/student.js");

module.exports = {


	checkStudentOwnership: function(req ,res , next){
		User.findById(req.authData.user._id).then( (foundUser) => {
			if(foundUser.students.indexOf(req.params.student_id) !== -1){
				next();
			}else{
				res.status(400).send("Student not found in user database");
			}
		}).catch( (err) => {
			return res.json({code: -1 , err : err});
		});
	},

	checkReportOwnership: function(req, res, next){
		Student.findById(req.params.student_id).then( (foundStudent) => {
			if(foundStudent.reports.indexOf(req.params.report_id) !== -1){
				next();
			}else{
				res.status(400).send("Report not found in student database");
			}
		}).catch( (err) => {
			return res.json({code: -1 , err : err});
		});
	}


	
}


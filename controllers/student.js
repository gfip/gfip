const Student = require("../models/student.js");
const User =require("../models/user.js");

module.exports = {

	getStudents : function(req, res){
		User.findById(req.authData.user._id).populate("students").exec()
		.then( (foundUser) => {
			return res.json(foundUser.students);
		}).catch( (err) => {
			return res.json({code: -1 , err : err});
		});
	},

	createStudent : function(req, res){
		var student = {
			login : req.body.login,
			name: req.body.name
		}
		User.findById(req.authData.user._id).then( (foundUser) => Student.create(student)
		.then( (createdStudent ) => {
			foundUser.students.push(createdStudent._id);
			foundUser.save();
			return res.json(createdStudent);
		})).catch( (err) =>{
			return res.json({code: -1 , err : err});
		});
	},

	deleteStudent : function(req, res){
		User.findById(req.authData.user._id).then( (foundUser) => Student.findByIdAndRemove(req.params.student_id)
		.then( (deletedStudent) => {
			foundUser.students.splice(foundUser.students.indexOf(req.params.student_id));
			foundUser.save();
			return res.json(deletedStudent);
		})).catch((err) => {
			return res.json({code: -1 , err : err});
		});
	},

	showStudent : function(req, res){
		Student.findById(req.params.student_id).then( (foundStudent) => {
			return res.json(foundStudent);
		}).catch( (err) => {
			return res.json({code: -1 , err : err});
		});
	},

	updateStudent : function(req, res){
		var updatedStudent = {
			login : req.body.login,
			name: req.body.name
		}
		Student.findByIdAndUpdate(req.params.student_id, updatedStudent).then( (foundStudent) => {
			return res.json({foundStudent, updatedStudent})
		}).catch((err) => {
			return res.json({code: -1 , err : err});
		});


	}






}
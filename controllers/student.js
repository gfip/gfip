const Student = require("../models/student.js");
const User =require("../models/user.js");
var Promise = require("bluebird");

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
		
		Promise.all([User.findById(req.authData.user._id), Student.create(student)])
		.spread((foundUser, createdStudent) => {
			foundUser.students.push(createdStudent._id);
			foundUser.save();
			return res.json(createdStudent);
		})
		.catch((err) =>{
 			console.log(err);
			return res.json({code: -1 , err});
		});
	},

	deleteStudent : function(req, res){
		Promise.all([User.findById(req.authData.user._id), Student.findByIdAndRemove(req.params.student_id)])
		.spread( (foundUser, deletedStudent) =>{
			foundUser.students.splice(foundUser.students.indexOf(req.params.student_id), 1);
			foundUser.save();
			return res.json(deletedStudent);
		}).catch((err) => {
			return res.json({code: -1 , err : err});
		});
	},

	showStudent : function(req, res){
		Student.findById(req.params.student_id)
		.then( (foundStudent) => {
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
		Student.findByIdAndUpdate(req.params.student_id, updatedStudent)
		.then( (foundStudent) => {
			return res.json({foundStudent, updatedStudent})
		}).catch((err) => {
			return res.json({code: -1 , err : err});
		});
	}






}
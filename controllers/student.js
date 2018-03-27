const Student = require("../models/student.js");
const User =require("../models/user.js");
const Report = require("../models/report.js");
const theHuxley = require("../modules/thehuxley/");

module.exports = {

	getStudents : async function(req, res){
		try{
			let foundUser = await User.findById(req.authData.user._id).populate("students").exec();
			res.json(foundUser.students);
		}catch(err){
			return res.json({code:-1, err:err.message});
		}
	},

	createStudent : async function(req, res){
		try{
			let studentData = await theHuxley.getUserInfoByName(req.body.name);
			let student = {
				name: req.body.name,
				username: req.body.username,
				theHuxleyId: studentData.id
			}
			let foundUser = await User.findById(req.authData.user._id);
			let createdStudent = await Student.create(student);
			foundUser.students.push(createdStudent._id);
			let updatedUser = await foundUser.save();
			res.json(createdStudent);
		}catch(err){
			res.json({code:-1 , err: err.message});
		}
	},

	deleteStudent : async function(req, res){
		try{
			let foundUser = await User.findById(req.authData.user._id);
			let deletedStudent = await Student.findByIdAndRemove(req.params.student_id);
			for(var i = 0 ; i < deletedStudent.reports.length; i++){
				await Report.findByIdAndRemove(deletedStudent.reports[i]);
			}
			foundUser.students.splice(foundUser.students.indexOf(req.params.student_id), 1);
			let updatedUser = await foundUser.save();
			return res.json(deletedStudent);
		}catch(err){
			return res.json({code:-1 , err:err.message});
		}
	},

	showStudent : async function(req, res){
		try{
			let foundStudent = await Student.findById(req.params.student_id);
			return res.json(foundStudent);
		}catch(err){
			return res.json({code:-1, err:err.message});
		}
	},

	updateStudent : async function(req, res){
		try{
			let student = {
				login : req.body.login,
				name: req.body.name
			}
			let updatedStudent = await Student.findByIdAndUpdate(req.params.student_id, student);
			return res.json(student);
		}catch(err){
			return res.json({code:-1, err:err.message});
		}
	}






}
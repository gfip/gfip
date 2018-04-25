const Student = require("../models/student.js");
const User =require("../models/user.js");
const Report = require("../models/report.js");
const List = require("../models/list.js");
const theHuxley = require("../modules/thehuxley/");
const listController = require("./list.js");

module.exports = {

	getStudents : async function(req, res){
		try{
			let foundUser = await User.findById(req.authData.user._id).populate("students").exec();
			returnedStudents = foundUser.students.map( (student) => {
				return {
					name: student.name,
					username: student.username,
					theHuxleyId: student.theHuxleyId
				};
			});
			return res.json(returnedStudents);
		}catch(err){
			return res.status(500).send(err.message);
		}
	},

	getStudentPendingLists: async function(studentId){
		try{
			await listController.getNewLists();
			let foundLists = await List.find({});
			let foundStudent = await Student.findById(studentId).populate("reports").exec();
			pendingLists = foundLists.filter( (list) => {
				let found = foundStudent.reports.find((report) => {
					return  report.list.theHuxleyId === list.theHuxleyId;
				})
				return !found;
			})
			return res.json(pendingLists);
		}catch(err){
			return res.status(500).send(err.message);
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
			return res.status(500).send(err.message);
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
			return res.status(500).send(err.message);
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
			return res.status(500).send(err.message)
		}
	},

	showStudent : async function(req, res){
		try{
			let foundStudent = await Student.findById(req.params.student_id);
			return res.json(foundStudent);
		}catch(err){
			return res.status(500).send(err.message)
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
			return res.status(500).send(err.message)
		}
	}

}

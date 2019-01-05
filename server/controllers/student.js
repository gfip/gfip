const Student = require('../models/student.js');
const User = require('../models/user.js');
const List = require('../models/list.js');
const theHuxley = require('../modules/thehuxley/');

module.exports = {

  getStudents: async (req, res) => {
    try {
      const foundUser = await User.findById(req.authData.user._id).populate('students').exec();
      const returnedStudents = foundUser.students.map(student => ({
        name: student.name,
        username: student.username,
        theHuxleyId: student.theHuxleyId,
        _id: student._id,
      }));
      return res.json(returnedStudents);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  getStudentPendingLists: async (req, res) => {
    try {
      const findLists = List.find({});
      const foundStudent = await Student.findById(req.params.student_id).populate('reports').exec();
      const foundLists = await findLists;
      const pendingLists = foundLists
        .filter(list => !foundStudent.reports
          .find(report => report.list.theHuxleyId === list.theHuxleyId && report.sent));
      return res.json(pendingLists);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  createStudent: async (req, res) => {
    try {
      const studentData = await theHuxley.getUserInfoByName(req.body.name);
      const student = {
        name: req.body.name,
        username: req.body.username,
        theHuxleyId: studentData.id,
      };
      const existingStudent = await Student
        .findOne({ name: student.name, username: req.body.username });
      const foundUser = await User.findById(req.authData.user._id).populate('students').exec();
      if (existingStudent) {
        if (foundUser.students.find(std => student.name === std.name)) {
          throw new Error('Student already exists');
        } else {
          foundUser.students.push(existingStudent._id);
          res.json(existingStudent);
        }
      } else {
        const createdStudent = await Student.create(student);
        foundUser.students.push(createdStudent._id);
        res.json(createdStudent);
      }
      return await foundUser.save();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const foundUser = await User.findById(req.authData.user._id);
      foundUser.students.splice(foundUser.students.indexOf(req.params.student_id), 1);
      await foundUser.save();
      const otherUser = await User.find({ students: req.params.student_id });
      let deletedStudent;
      if (otherUser.length > 0) {
        deletedStudent = await Student.findById(req.params.student_id);
      } else {
        deletedStudent = await Student.findByIdAndRemove(req.params.student_id);
      }
      return res.json(deletedStudent);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  showStudent: async (req, res) => {
    try {
      const foundStudent = await Student.findById(req.params.student_id);
      return res.json(foundStudent);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  updateStudent: async (req, res) => {
    try {
      const student = {
        login: req.body.login,
        name: req.body.name,
      };
      await Student.findByIdAndUpdate(req.params.student_id, student);
      return res.json(student);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

};

const Student = require('../models/student');
const Report = require('../models/report');
const User = require('../models/user');
const listController = require('./list');
const mailer = require('../modules/email');

module.exports = {
  getReports: async (req, res) => {
    try {
      const foundStudent = await Student.findById(req.params.student_id).populate('reports').exec();
      return res.json(foundStudent.reports);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  createReport: async (req, res) => {
    try {
      const findUser = User.findById(req.authData.user._id);
      const listStudents = listController
        .getStudentList(req.params.student_id, req.params.list_id);
      const findOtherUsers = User.find({ students: req.params.student_id });
      const foundStudent = await Student.findById(req.params.student_id);
      const foundUser = await findUser;
      const studentList = await listStudents;
      const report = {
        list: studentList.list,
        submissions: [],
      };
      report.score = req.body.scores.reduce((acm, score) => acm + score, 0);
      report.submissions = studentList.submissions.map((submission, i) => ({
        problem: {
          tries: submission.tries,
          name: submission.problem.name,
          maxScore: submission.problem.score,
          theHuxleyId: submission.problem.theHuxleyId,
        },
        score: req.body.scores[i],
        evaluation: studentList.submissions[i].evaluation,
        comment: req.body.comments[i],
      }));
      report.finalComment = req.body.finalComment;
      report.author = foundUser.username;
      const createReport = Report.create(report);
      const otherUsers = await findOtherUsers;
      const mail = mailer.sendReport(report, foundStudent, otherUsers);
      const createdReport = await createReport;
      foundStudent.reports.push(createdReport._id);
      await foundStudent.save();
      await mail;
      return res.json(createdReport);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  createBlankReport: async (req, res) => {
    try {
      const getStudentList = listController
        .getStudentList(req.params.student_id, req.params.list_id);
      const findStudent = Student.findById(req.params.student_id);
      const studentList = await getStudentList;
      const report = {
        list: studentList.list,
        submissions: [],
      };
      const createdReport = await Report.create(report);
      const foundStudent = await findStudent;
      foundStudent.reports.push(createdReport._id);
      await foundStudent.save();
      return res.json(createdReport);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  deleteReport: async (req, res) => {
    try {
      const foundStudent = await Student.findById(req.params.student_id);
      const deletedReport = await Report.findByIdAndRemove(req.params.report_id);
      foundStudent.reports.splice(foundStudent.reports.indexOf(req.params.report_id), 1);
      await foundStudent.save();
      return res.json(deletedReport);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  showReport: async (req, res) => {
    try {
      const foundReport = await Report.findById(req.params.report_id);
      return res.json(foundReport);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  updateReport: async (req, res) => {
    try {
      const report = {
        title: req.body.title,
      };
      await Report.findByIdAndUpdate(req.params.report_id, report);
      return res.json(report);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },


};

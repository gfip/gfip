const Student = require('../models/student');
const Report = require('../models/report');
const User = require('../models/user');
const listController = require('./list');
const List = require('../models/list');
const checkBarrier = require('../modules/barrier/');

module.exports = {
  getReports: async (req, res) => {
    try {
      const foundStudent = await Student.findById(req.params.student_id).populate('reports').exec();
      return res.json(foundStudent.reports);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  saveReport: async (req, res) => {
    try {
      const foundStudent = await Student.findById(req.params.student_id).populate('reports').exec();
      const list = await List.findById(req.params.list_id);
      const foundReport = foundStudent.reports
        .find(report => report.list.theHuxleyId === list.theHuxleyId);
      if (!foundReport) {
        return res.json('not found');
      }
      foundReport.score = req.body.scores.reduce((acm, score) => acm + score, 0);
      for (let i = 0; i < foundReport.submissions.length; i += 1) {
        foundReport.submissions[i].problem.score = req.body.scores[i];
        foundReport.submissions[i].comment = req.body.comments[i];
      }
      foundReport.finalComment = req.body.finalComment;
      foundReport.author = req.authData.user.username;
      await foundReport.save();
      return res.json(foundReport);
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
        sent: true,
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

  sendReport: async (req, res) => {
    try {
      const foundStudent = await Student.findById(req.params.student_id).populate('reports').exec();
      const list = await List.findById(req.params.list_id);
      const foundReport = foundStudent.reports
        .find(report => report.list.theHuxleyId === list.theHuxleyId);
      if (!foundReport) {
        return res.json('not found');
      }
      foundReport.score = req.body.scores.reduce((acm, score) => acm + score, 0);
      for (let i = 0; i < foundReport.submissions.length; i += 1) {
        foundReport.submissions[i].problem.score = req.body.scores[i];
        foundReport.submissions[i].comment = req.body.comments[i];
      }
      foundReport.finalComment = req.body.finalComment;
      foundReport.author = req.authData.user.username;
      foundReport.sent = true;
      await foundReport.save();
      await checkBarrier(list);
      return res.json(foundReport);
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
      const foundUser = await User.findById(req.authData.user._id);
      const studentList = await listController.getStudentList(req.params.student_id, req.params.list_id);
      const foundStudent = await Student.findById(req.params.student_id).populate('reports').exec();
      const foundReport = foundStudent.reports.find(report => report.list.theHuxleyId === studentList.list.theHuxleyId);
      let returnedReport;
      if (foundReport) {
        returnedReport = foundReport;
      } else {
        const report = {
          list: studentList.list,
          submissions: [],
          finalComment: '',
          student: {
            name: foundStudent.name,
            login: foundStudent.username,
            theHuxleyId: foundStudent.theHuxleyId,
          },
          author: foundUser.username,
        };
        report.submissions = await Promise.all(studentList.submissions.map(async (submission, i) => ({
          tries: submission.tries,
          problem: {
            name: submission.problem.name,
            maxScore: submission.problem.score,
            theHuxleyId: submission.problem.theHuxleyId,
            score: submission.evaluation === 'CORRECT' ? submission.problem.score : 0,
          },
          theHuxleyId: submission.theHuxleyId,
          evaluation: studentList.submissions[i].evaluation,
          comment: '',
          code: submission.theHuxleyId === 0 ? '' : await listController.getSubmissionCode(submission.theHuxleyId),
        })));
        returnedReport = await Report.create(report);
        foundStudent.reports.push(returnedReport._id);
        await foundStudent.save();
      }
      return res.json(returnedReport);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

};

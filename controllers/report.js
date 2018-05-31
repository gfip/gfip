const Student = require('../models/student');
const Report = require('../models/report');
const User = require("../models/user");
const listController = require('./list');
const mailer = require('../modules/email');

module.exports = {
    getReports: async function(req, res) {
        try {
            const foundStudent = await Student.findById(req.params.student_id).populate('reports').exec();
            return res.json(foundStudent.reports);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },

    createReport: async function(req, res) {
        try {
            const foundUser = await User.findById(req.authData.user._id);
            const studentList = await listController
                .getStudentList(req.params.student_id, req.params.list_id);
            const foundStudent = await Student.findById(req.params.student_id);
            const report = {
                list: studentList.list,
                submissions: [],
            };
            for (let i = 0; i < studentList.submissions.length; i += 1) {
                report.submissions.push({
                    problem: {
                        tries: studentList.tries, 
                        name: studentList.submissions[i].problem.name,
                        score: studentList.submissions[i].problem.score,
                        theHuxleyId: studentList.submissions[i].problem.theHuxleyId,
                    },
                    evaluation: studentList.submissions[i].evaluation,
                    comment: req.body.comments[i],
                });
            }
            report.finalComment = req.body.finalComment;
            const createdReport = await Report.create(report);
            foundStudent.reports.push(createdReport._id);
            await foundStudent.save();
            await mailer.sendReport(report, foundStudent, foundUser);
            return res.json(createdReport);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },

    createBlankReport: async function(req, res) {
        try {
            const studentList = await listController
            .getStudentList(req.params.student_id, req.params.list_id);
            const foundStudent = await Student.findById(req.params.student_id);
            const report = {
                list: studentList.list,
                submissions: []
            };
            const createdReport = await Report.create(report);
            foundStudent.reports.push(createdReport._id);
            await foundStudent.save();
            return res.json(createdReport);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },

    deleteReport: async function(req, res) {
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

    showReport: async function(req, res) {
        try {
            const foundReport = await Report.findById(req.params.report_id);
            return res.json(foundReport);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },

    updateReport: async function(req, res){
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

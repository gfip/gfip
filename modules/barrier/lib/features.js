const mongoose = require('mongoose');

const Student = require('../../../models/student');
const Report = require('../../../models/report');
const User = require('../../../models/report');


const { sendReport } = require('../../email/');

module.exports = list => new Promise( async (resolve, reject) => {
  try {
    const doneReports = {};
    const findReports = Report.find({ list: { theHuxleyId: list.theHuxleyId } });
    const students = await Student.find({});
    const reports = await findReports;
    reports.forEach((report) => {
      if (report.sent) {
        doneReports[report.student.theHuxleyId] = report;
      }
    });
    let allDone = true;
    for (let i = 0; i < students.length && allDone; i += 1) {
      if (!doneReports[students[i].theHuxleyId]) {
        allDone = false;
      }
    }
    if (allDone) {
      await Promise.all(students.map(async (student) => {
        const report = doneReports[student.theHuxleyId];
        const foundUsers = await User.find({ students: { $in: mongoose.Types.ObjectId((student._id)) } });
        sendReport(report, student, foundUsers);
      }));
      resolve(true);
    } else {
      resolve(false);
    }
  } catch (err) {
    return reject(err);
  }
});

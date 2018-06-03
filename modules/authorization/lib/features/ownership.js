const User = require(__base + 'models/user.js');
const Student = require(__base + 'models/student.js');

module.exports = {


  checkStudentOwnership: (req, res, next) =>
    User.findById(req.authData.user._id).then((foundUser) => {
      if (foundUser.students.find(req.params.student_id)) {
        next();
      } else {
        res.status(400).send('Student not found in user database');
      }
    }).catch(err => res.status(500).send(err.message)),

  checkReportOwnership: (req, res, next) =>
    Student.findById(req.params.student_id).then((foundStudent) => {
      if (foundStudent.reports.find(req.params.report_id)) {
        next();
      } else {
        res.status(400).send('Report not found in student database');
      }
    }).catch(err => res.status(500).send(err.message)),
};


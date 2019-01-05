const transporter = require('../transporter');
const getOptions = require('./options');
const table = require('./table');

module.exports = (report, student, users) => new Promise((resolve, reject) => {
  const options = getOptions(student, table(report, student), report.list.title, users);
  transporter.sendMail(options, (err, info) => {
    if (err) {
      reject(err);
    } else {
      resolve(info);
    }
  });
});

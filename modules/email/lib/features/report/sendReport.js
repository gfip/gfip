const transporter = require("../transporter");
const getOptions = require("./options");
const table = require("./table");

module.exports = (report, student, user) => new Promise((resolve, reject) => {
  const options = getOptions(student, table(report, student, user), report.list.title, user);
  transporter.sendMail(options, (err, info) => {
    if (err) {
      reject(err);
    } else {
      resolve(info);
    }
  });
});

const transporter = require('../transporter');
const getOptions = require('../options');
const table = require('./table');

module.exports = (user, token) => new Promise((resolve, reject) => {
  const options = getOptions(user, table(token), 'Confirmation Email');
  transporter.sendMail(options, (err, info) => {
    if (err) {
      reject(err);
    } else {
      resolve(info);
    }
  });
});

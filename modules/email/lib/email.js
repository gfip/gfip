const sendReport = require('./features/report/sendReport');
const sendConfirmation = require('./features/confirmation/sendConfirmation');
const sendPasswordReset = require('./features/password/sendPasswordChange');

module.exports = {
  sendReport,
  sendConfirmation,
  sendPasswordReset,
};

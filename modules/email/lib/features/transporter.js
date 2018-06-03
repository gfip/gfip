const nodemailer = require('nodemailer');

const { emailUser, emailPassword } = require(__base + 'config/constants.js').email;

module.exports = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

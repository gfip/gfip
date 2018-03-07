const nodemailer = require('nodemailer');

const options = require(__base + "config/constants.js").email;

module.exports = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: options.emailUser,
    pass: options.emailPassword
  } 
});

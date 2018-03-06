const nodemailer = require('nodemailer');

const options = require("../../../../config/constants.js").email;

module.exports = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: options.emailUser,
    pass: options.emailPassword
  } 
});

const nodemailer = require('nodemailer');

require("dotenv").config();

module.exports = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD
  } 
});

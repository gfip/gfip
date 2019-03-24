require('dotenv').config({ path: '../.env' })

const constants = {

  authentication: {
    loginKey: process.env.SECRET_KEY,
    confirmationKey: process.env.CONFIRMATION_SECRET_KEY,
    passwordResetKey: process.env.PASSRESET_SECRET_KEY,
  },

  email: {
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
  },

  thehuxley: {
    username: process.env.THEHUXLEY_USERNAME,
    password: process.env.THEHUXLEY_PASSWORD,
  },

  clientAddress: process.env.CLIENT_ADDRESS || process.env.ADDRESS,
  address: process.env.ADDRESS,
  port: process.env.PORT
};

module.exports = constants;

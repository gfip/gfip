const User = require('../models/user.js');
const jwt = require('jwt-then');
const passport = require('passport');
const mailer = require('../modules/email');
const auth = require('../config/constants.js').authentication;
const { isMonitor } = require('../modules/authorization');
const env = require('../config/constants');

module.exports = {

  loginUser: (req, res, next) => passport.authenticate('local', async (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    try {
      const token = await jwt.sign({ user }, auth.loginKey);
      if (user) {
        if (user.isConfirmed) {
          return res.json({ token });
        }
        return res.status(401).send('User not confirmed');
      }
      return res.status(401).send('Incorrect username or password.');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  })(req, res, next),

  registerUser: async (req, res) => {
    try {
      const imgUrl = await isMonitor(req.body.username);
      const registeredUser = await User.register(new User({
        username: req.body.username,
        imageUrl: imgUrl,
      }), req.body.password);
      const token = await jwt.sign({ user: registeredUser }, auth.confirmationKey);
      await mailer.sendConfirmation(registeredUser, token);
      return res.status(200).send('Successfully registered, please confirm your @cin.ufpe.br e-mail.');
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
  },

  changePassword: async (req, res) => {
    try {
      const foundUser = await User.findById(req.authData.user._id);
      await foundUser.changePassword(req.body.oldPassword, req.body.newPassword);
      return res.status(200).send('Password Successfully changed');
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },


  resetPasswordEmail: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      const token = await jwt.sign({ user }, auth.passwordResetKey);
      await mailer.sendPasswordReset(user, token);
      return res.status(200).send('Reset password email sent to your @cin.ufpe.br email');
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },


  resetPassword: async (req, res) => {
    try {
      const authData = await jwt.verify(req.params.token, auth.passwordResetKey);
      const foundUser = await User.findById(authData.user._id);
      if (foundUser) {
        await foundUser.setPassword(req.body.newPassword);
        return res.status(200).send(`Changed password for ${foundUser.username}`);
      }
      throw new Error('User does not exist');
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  confirmUser: async (req, res) => {
    try {
      const authData = await jwt.verify(req.params.token, auth.confirmationKey);
      const foundUser = await User.findById(authData.user._id);
      if (foundUser) {
        foundUser.isConfirmed = true;
        await foundUser.save();
        return res.redirect(env.clientAddress);
      }
      throw new Error('User already canceled registration');
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  cancelRegister: async (req, res) => {
    try {
      const authData = await jwt.verify(req.params.token, auth.confirmationKey);
      const foundUser = await User.findById(authData.user._id);
      if (foundUser.isConfirmed) {
        throw new Error('User already confirmed registration');
      } else {
        await User.findByIdAndRemove(foundUser._id);
        return res.redirect(env.clientAddress);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  getUser: async (req, res) => {
    try {
      const foundUser = await User.findById(req.authData.user._id);
      const { username, imageUrl } = foundUser;
      return res.json({ username, imageUrl });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
};

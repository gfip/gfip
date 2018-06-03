const express = require('express');
const controller = require('../controllers/user.js');
const verifyToken = require('../modules/authorization').token;

const router = express.Router();


router.post('/register', controller.registerUser);

router.post('/login', controller.loginUser);

router.put('/me/reset/:token', controller.resetPassword);

router.post('/me/reset', controller.resetPasswordEmail);

router.get('/confirm/:token', controller.confirmUser);

router.get('/cancel/:token', controller.cancelRegister);

router.get('/me', verifyToken, controller.getUser);

router.put('/me', verifyToken, controller.changePassword);

module.exports = router;

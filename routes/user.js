const express = require("express"),
	  router  = express.Router(),
	  controller = require("../controllers/user.js");

const verifyToken = require("../modules/authorization").token;

router.post("/register",controller.registerUser);

router.post("/login", controller.loginUser);

router.get("/confirm/:token", controller.confirmUser);

router.get("/cancel/:token", controller.cancelRegister);

router.get("/me", verifyToken ,controller.getUser);

router.post("/me", verifyToken, controller.changePassword);

module.exports = router;
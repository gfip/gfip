const express = require("express"),
	  router  = express.Router(),
	  controller = require("../controllers/user.js");

const verifyToken = require("../modules/auth.js");

router.post("/register",controller.registerUser);

router.post("/login", controller.loginUser);

router.get("/confirm/:token", controller.confirmUser);

router.get("/me", verifyToken ,controller.getUser);

module.exports = router;
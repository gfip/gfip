const express = require("express"),
	  router  = express.Router(),
	  controller = require("../controllers/user.js");


router.post("/register",controller.registerUser);

router.post("/login", controller.loginUser);

router.get("/confirm/:token", controller.confirmUser);

module.exports = router;
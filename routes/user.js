const express = require("express"),
	  router  = express.Router(),
	  controller = require("../controllers/user.js");


router.post("/register",controller.registerUser);

router.post("/login", controller.loginUser);


module.exports = router;
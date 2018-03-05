const express = require("express"),
	controller = require("../controllers/student.js"),
	router = express.Router();

const middleware = require("../modules/middleware.js");

router.get("/", controller.getStudents);

router.post("/", controller.createStudent);

router.delete("/:student_id", middleware.checkStudentOwnership, controller.deleteStudent);

router.get("/:student_id", middleware.checkStudentOwnership, controller.showStudent);

router.put("/:student_id", middleware.checkStudentOwnership, controller.updateStudent);

module.exports = router;
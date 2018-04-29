const express = require("express"),
	controller = require("../controllers/student.js"),
	router = express.Router();

var middleware = require("../modules/authorization").ownership;

router.get("/", controller.getStudents);

router.post("/", controller.createStudent);

router.get("/:student_id/lists", middleware.checkStudentOwnership, controller.getStudentPendingLists);

router.get("/:student_id/lists/:list_id", middleware.checkStudentOwnership,controller.showStudentList);

router.delete("/:student_id", middleware.checkStudentOwnership, controller.deleteStudent);

router.get("/:student_id", middleware.checkStudentOwnership, controller.showStudent);

router.put("/:student_id", middleware.checkStudentOwnership, controller.updateStudent);

module.exports = router;
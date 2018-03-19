var express = require("express");
var router = express.Router();
var controller = require("../controllers/report.js");
var middleware = require("../modules/authorization").ownership;


router.get("/:student_id/lists/:lists_id/reports", middleware.checkStudentOwnership ,controller.getReports);

router.get("/:student_id/lists/:list_id/reports/new", middleware.checkStudentOwnership,controller.showStudentList);

router.post("/:student_id/lists/:list_id/reports", middleware.checkStudentOwnership ,controller.createReport);

router.delete("/:student_id/lists/:list_id/reports/:report_id",middleware.checkStudentOwnership, middleware.checkReportOwnership, controller.deleteReport);

router.get("/:student_id/reports/:report_id",middleware.checkStudentOwnership, middleware.checkReportOwnership, controller.showReport);

router.put("/:student_id/reports/:report_id",middleware.checkStudentOwnership, middleware.checkReportOwnership, controller.updateReport);


module.exports = router;
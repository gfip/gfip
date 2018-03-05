var express = require("express");
var router = express.Router();
var controller = require("../controllers/report.js");
var middleware = require("../middleware.js");


router.get("/:student_id/reports", controller.getReports);

router.post("/:student_id/reports", controller.createReport);

router.delete("/:student_id/reports/:report_id",middleware.checkStudentOwnership, middleware.checkReportOwnership, controller.deleteReport);

router.get("/:student_id/reports/:report_id",middleware.checkStudentOwnership, middleware.checkReportOwnership, controller.showReport);

router.put("/:student_id/reports/:report_id",middleware.checkStudentOwnership, middleware.checkReportOwnership, controller.updateReport);


module.exports = router;
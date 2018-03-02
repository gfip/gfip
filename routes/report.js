var express = require("express");
var router = express.Router();
var controller = require("../controllers/report.js");

router.get("/:student_id/reports", controller.getReports);

router.post("/:student_id/reports", controller.createReport);

router.delete("/:student_id/reports/:report_id", controller.deleteReport);

router.get("/:student_id/reports/:report_id", controller.showReport);

router.put("/:student_id/reports/:report_id", controller.updateReport);

module.exports = router;
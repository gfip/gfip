const express = require('express');
const controller = require('../controllers/report.js');
const middleware = require('../modules/authorization').ownership;

const router = express.Router();

router.put('/:student_id/lists/:list_id/reports/send', middleware.checkStudentOwnership, controller.sendReport);

router.post('/:student_id/lists/:list_id/reports/blank', middleware.checkStudentOwnership, controller.createBlankReport);

router.get('/:student_id/reports', middleware.checkStudentOwnership, controller.getReports);

router.put('/:student_id/lists/:list_id/reports/save', middleware.checkStudentOwnership, controller.saveReport);

router.delete('/:student_id/reports/:report_id', middleware.checkStudentOwnership, middleware.checkReportOwnership, controller.deleteReport);

router.get('/:student_id/lists/:list_id/reports', middleware.checkStudentOwnership, controller.showReport);

module.exports = router;

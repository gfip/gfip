const express = require('express');
const controller = require('../controllers/report.js');
const middleware = require('../modules/authorization').ownership;

const router = express.Router();


router.get('/:student_id/reports', middleware.checkStudentOwnership, controller.getReports);

router.put('/:student_id/reports/:report_id', middleware.checkStudentOwnership, controller.saveReport);

router.put('/:student_id/reports/:report_id/send', middleware.checkStudentOwnership, middleware.checkReportOwnership, controller.sendReport);

router.post('/:student_id/lists/:list_id/reports/blank', middleware.checkStudentOwnership, controller.createBlankReport);

router.delete('/:student_id/reports/:report_id', middleware.checkStudentOwnership, middleware.checkReportOwnership, controller.deleteReport);

router.get('/:student_id/lists/:list_id/reports', middleware.checkStudentOwnership, controller.showReport);

module.exports = router;

/**
 * GET
 * /:students_id/lists/:list_id/reports
 * Checa se ja existe um report para essa lista e o retorna, caso não exista cria um.
 * 
 * PUT
 * /:students_id/reports/:report_id
 * Atualiza/Salva o report
 * 
 * PUT
 * /:students_id/reports/:report_id/send
 * Envia o report
 * 
 */
const express = require('express');
const middleware = require('../modules/authorization').ownership;
const controller = require('../controllers/student.js');

const router = express.Router();

router.get('/', controller.getStudents);

router.post('/', controller.createStudent);

router.get('/:student_id/lists', middleware.checkStudentOwnership, controller.getStudentPendingLists);

router.delete('/:student_id', middleware.checkStudentOwnership, controller.deleteStudent);

router.get('/:student_id', middleware.checkStudentOwnership, controller.showStudent);

router.put('/:student_id', middleware.checkStudentOwnership, controller.updateStudent);

module.exports = router;

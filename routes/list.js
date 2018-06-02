const express = require('express');
const controller = require('../controllers/list');

const router = express.Router();


router.get('/', controller.getNewLists);


module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/list.js");
const verifyToken = require("../modules/authorization").token;


router.get("/", controller.getNewLists);


module.exports = router;
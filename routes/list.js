const express = require("express");
const router = express.Router();
var controller = require("../controllers/list.js");

router.get("/", controller.getNewLists);


module.exports = router;
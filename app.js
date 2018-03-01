const express  = require("express"),
	  mongoose = require("mongoose"),
	  app      = express();

mongoose.connect("mongodb://localhost/feedback-generator");


app.listen(3000, function(){});
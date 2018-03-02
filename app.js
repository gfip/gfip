const express  = require("express"),
	  mongoose = require("mongoose"),
	  methodOverride = require("method-override"),
	  bodyParser = require("body-parser"),
	  app      = express();



var reportRoutes = require("./routes/report.js");

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/feedback-generator");


app.get("/", function(req, res){
	res.render("index.ejs");
});


app.use("/students/", reportRoutes);


app.listen(3000, function(){
	console.log("app listening...");
});
const express  = require("express"),
	  mongoose = require("mongoose"),
	  methodOverride = require("method-override"),
	  bodyParser = require("body-parser"),
	  passport = require("passport"),
	  LocalStrategy = require("passport-local"),
	  User = require("./models/user.js"),
	  app = express();


var verifyToken = require("./auth.js");
var middleware = require("./middleware.js");
// requiring routes
var reportRoutes = require("./routes/report.js");
var userRoutes = require("./routes/user.js");
var studentRoutes = require("./routes/student.js");


app.use(bodyParser.urlencoded({extended:true}));// body-parser
app.use(methodOverride("_method"));// method-override
require('dotenv').config(); // eviroment variables

mongoose.connect("mongodb://localhost/feedback-generator"); // connecting db

// setting passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/students/", verifyToken ,reportRoutes);
app.use("/", userRoutes);
app.use("/students/",verifyToken, studentRoutes);


app.listen(3000, () => console.log("Listening on port 3000"));

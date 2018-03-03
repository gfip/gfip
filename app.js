const express  = require("express"),
	  mongoose = require("mongoose"),
	  methodOverride = require("method-override"),
	  bodyParser = require("body-parser"),
	  jwt = require("jsonwebtoken"),
	  passport = require("passport"),
	  LocalStrategy = require("passport-local"),
	  User = require("./models/user.js"),
	  app = express();


var verifyToken = require("./auth.js");

// requiring routes
var reportRoutes = require("./routes/report.js");
var userRoutes = require("./routes/user.js");



app.use(bodyParser.urlencoded({extended:true}));// body-parser
app.use(methodOverride("_method"));// method-override
require('dotenv').config(); // eviroment variables

mongoose.connect(process.env.DB); // connecting db

// setting passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/students/", verifyToken,reportRoutes);
app.use("/", userRoutes);

// test route
//app.get("/secret", verifyToken , (req, res) => res.json("This is a Secret Page!!"));

app.listen(3000, () => console.log("Listening on port 3000"));

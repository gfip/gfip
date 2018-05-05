const express = require('express');
const mongoose = require('mongoose');

const methodOverride = require('method-override');
	bodyParser = require('body-parser'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	User = require('./models/user.js'),
	path = require('path'),	
	app = express();

global.__base = __dirname + '/'; //set __base as root directory

const verifyToken = require("./modules/authorization/index.js").token;
// requiring routes
const reportRoutes = require("./routes/report.js");
const userRoutes = require("./routes/user.js");
const studentRoutes = require("./routes/student.js");
const listRoutes = require("./routes/list.js");
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));// body-parser
app.use(methodOverride("_method"));// method-override

mongoose.connect( process.env.MONGO_URL || 'mongodb://localhost/feedback-generator' ).catch((err) => console.log(err.message)); // connecting db

// setting passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api/me/students/", verifyToken ,reportRoutes);
app.use("/api/", userRoutes);
app.use("/api/me/students/",verifyToken, studentRoutes);
app.use("/api/lists/", listRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT || 5000, () => console.log("Listening"));

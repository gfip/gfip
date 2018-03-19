const express  = require("express"),
	  mongoose = require("mongoose"),
	  methodOverride = require("method-override"),
	  bodyParser = require("body-parser"),
	  passport = require("passport"),
	  LocalStrategy = require("passport-local"),
	  User = require("./models/user.js"),
	  path = require('path');
	  app = express();


global.__base = __dirname + '/'; //set __base as root directory

// DEBUG
// User.remove({username: "rma7"}).then(() => console.log("Rma7 removed"));
// var listController = require("./controllers/list.js");
// listController.getNewLists();
// listController.getStudentList("5aaaea9eae9edd34efc20508","5aaab0a5034527253dbeaf1a")
// .then( (studentList) => console.log(studentList));

//==========================================================================




var verifyToken = require("./modules/authorization/index.js").token;
// requiring routes
var reportRoutes = require("./routes/report.js");
var userRoutes = require("./routes/user.js");
var studentRoutes = require("./routes/student.js");

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
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT || 5000, () => console.log("Listening"));

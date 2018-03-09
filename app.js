const express  = require("express"),
	  mongoose = require("mongoose"),
	  methodOverride = require("method-override"),
	  bodyParser = require("body-parser"),
	  passport = require("passport"),
	  LocalStrategy = require("passport-local"),
	  User = require("./models/user.js"),
	  app = express();

global.__base = __dirname + '/'; //set __base as root directory
var verifyToken = require("./modules/authorization/index.js").token;
// requiring routes
var reportRoutes = require("./routes/report.js");
var userRoutes = require("./routes/user.js");
var studentRoutes = require("./routes/student.js");


app.use(bodyParser.urlencoded({extended:true}));// body-parser
app.use(methodOverride("_method"));// method-override

mongoose.connect( process.env.MONGO_URL ).catch((err) => console.log(err.message)); // connecting db

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// setting passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/api/me/students/", verifyToken ,reportRoutes);
app.use("/api/", userRoutes);
app.use("/api/me/students/",verifyToken, studentRoutes);


app.listen(process.env.PORT || 5000, () => console.log("Listening"));

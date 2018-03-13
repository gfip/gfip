const User = require("../models/user.js");
const jwt  = require("jwt-then");
const passport = require("passport");
const mailer = require("../modules/email");
const auth = require("../config/constants.js").authentication;
const isMonitor = require("../modules/authorization").isMonitor;

module.exports = {

	loginUser : function(req, res, next) {
		passport.authenticate('local', (err, user, info) => {
		  	if(err){
		  		res.json({ code: -1 , err: err.message});
		  	}else{
		  		jwt.sign({user:user}, auth.loginKey).then( (token) => {
		  			if(user){
		  				if(user.isConfirmed){
		  					res.json({
				  				token
				  			});	
		  				}else{
		  					res.status(401).send("User not confirmed")
		  				}
		  			}else{
	  					res.status(401).send("Incorrect username or password.");
		  			}
		  		}).catch( (err) => {
		  			res.json({ code: -1 , err: err.message});
		  		});

		  	}

	    })(req, res, next);
	},

	registerUser: function(req, res) {
		let userData;
		isMonitor(req.body.username).then( () => {
			return User.register( new User( {username:req.body.username} ), req.body.password);
		}).then((user) => {
			userData = user;
			return jwt.sign({user:user}, auth.confirmationKey);
		}).then((token) => {
			let username = userData.username;
			res.redirect("/");
			return mailer.sendConfirmation(userData, token);
		}).catch((err) => {
			res.json({code:-1, err:err.message});
		});
	},

	confirmUser: function(req, res) {
		jwt.verify(req.params.token, auth.confirmationKey).then( (authData) => {
			return User.findById(authData.user._id);
		}).then( (foundUser) => {
			if(foundUser){
				foundUser.isConfirmed = true;
				foundUser.save();
				var username = foundUser.username;
				return res.redirect("/");
			}else{
				throw new Error("User already canceled registration");
			}
		}).catch( (err) => {
			return res.json({code: -1 , err : err.message});
		});
	},

	cancelRegister: function(req, res) {
		jwt.verify(req.params.token, auth.confirmationKey).then((authData) => {
			return User.findById(authData.user._id);
		}).then( (foundUser) => {
			if(foundUser.isConfirmed){
				throw new Error("User already confirmed registration");
			}else{
				return User.findByIdAndRemove(foundUser._id);
			}
		}).then(() => {
			res.redirect("/");
		}).catch((err) => {
			res.json({code: -1 , err: err.message});
		});

	},

	getUser: function(req, res){
		User.findById(req.authData.user._id).then( (foundUser) => {
			var username = foundUser.username;
			var students = foundUser.students;
			res.json({username, students});
		}).catch( (err) => {
			res.json({code: -1, err: err.message})
		});
	}



}
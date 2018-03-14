const User = require("../models/user.js");
const jwt  = require("jwt-then");
const passport = require("passport");
const mailer = require("../modules/email");
const auth = require("../config/constants.js").authentication;
const isMonitor = require("../modules/authorization").isMonitor;

module.exports = {

	loginUser : function(req, res, next) {
		passport.authenticate('local', async (err, user, info) => {
		  	if(err){
		  		return res.json({ code: -1 , err: err.message});
		  	}else{
		  		try{
			  		let token = await jwt.sign({user:user}, auth.loginKey);
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
		  		}catch(err){
		  			return res.json({code:-1, err:err.message});
		  		}
		  	}
	    })(req, res, next);
	},

	registerUser: async function(req, res) {
		try{
			let registeredUser = await User.register( new User( {username:req.body.username} ), req.body.password);
			let token = await jwt.sign({user:registeredUser}, auth.confirmationKey);
			res.redirect("/");
			return await mailer.sendConfirmation(registeredUser, token);
		}catch(err){
			return res.json({code:-1 , err:err.message});
		}
	},

	confirmUser: async function(req, res) {
		try{
			let authData = await jwt.verify(req.params.token, auth.confirmationKey);
			let foundUser = await User.findById(authData.user._id);
			if(foundUser){
				foundUser.isConfirmed = true;
				let confirmedUser = await foundUser.save();
				return res.redirect("/");
			}else{
				throw new Error("User already canceled registration");
			}
		}catch(err){
			return res.json({code:-1, err:err.message});
		}
	},

	cancelRegister: async function(req, res) {
		try{
			let authData = await jwt.verify(req.params.token , auth.confirmationKey);
			let foundUser = await User.findById(authData.user._id);
			if(foundUser.isConfirmed){
				throw new Error("User already confirmed registration");
			}else{
				let canceledUser = await User.findByIdAndRemove(foundUser._id);
				return res.redirect("/");
			}
		}catch(err){
			return res.json({code:-1 , err:err.message});
		}
	},

	getUser: async function(req, res){
		try{
			let foundUser = await User.findById(req.authData.user._id).populate("students").exec();
			let username = foundUser.username;
			let students = foundUser.students;
			res.json({username, students});
		}catch(err){
			return res.json({code:-1, err:err.message});
		}
	}



}
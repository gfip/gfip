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
		  		return res.status(500).send(err.message);
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
		  			return res.status(500).send(err.message);
		  		}
		  	}
	    })(req, res, next);
	},

	registerUser: async function(req, res) {
		try{
			let imgUrl = await isMonitor(req.body.username);
			let registeredUser = await User.register( new User( {username:req.body.username, imageUrl: imgUrl} ), req.body.password);
			let token = await jwt.sign({user:registeredUser}, auth.confirmationKey);
			await mailer.sendConfirmation(registeredUser, token);
			res.status(200).send("Successfully registered, please confirm your @cin.ufpe.br e-mail.");
		}catch(err){
			return res.status(500).send(err.message);
		}
	},

	changePassword: async function(req, res){
		try{
			let foundUser = await User.findById(req.authData.user._id);
			await foundUser.changePassword(req.body.oldPassword, req.body.newPassword);
			return res.json("Password Successfully changed");
		}catch(err){
			return res.status(500).send(err.message);
		}
	},


	resetPasswordEmail: async function(req, res){
		try{
			let user = await User.findOne({username: req.body.username});
			let token = await jwt.sign({user:user}, auth.passwordResetKey);
			await mailer.sendPasswordReset(user, token);
			res.json("Reset password email sent to " + user.username + "@cin.ufpe.br");
		}catch(err){
			return res.status(500).send(err.message);
		}
	},


	resetPassword: async function(req, res){
		try{
			let authData = await jwt.verify(req.params.token, auth.passwordResetKey);
			let foundUser =  await User.findById(authData.user._id);
			if(foundUser){+
				await foundUser.setPassword(req.body.newPassword);
				res.json("Changed password for " +  foundUser.username);
			}else{
				throw new Error("User does not exist");
			}
		}catch(err){
			return res.status(500).send(err.message);
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
			return res.status(500).send(err.message);
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
			res.status(500).send(err.message);
		}
	},

	getUser: async function(req, res){
		try{
			let foundUser = await User.findById(req.authData.user._id);
			let username = foundUser.username;
			let imageUrl = foundUser.imageUrl;
			res.json({username, imageUrl});
		}catch(err){
			res.status(500).send(err.message);
		}
	} 



}
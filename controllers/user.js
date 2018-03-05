const User = require("../models/user.js");
const jwt  = require("jsonwebtoken");
const passport = require("passport");
const nodemailer = require("nodemailer");

const transporter = require("../email.js");


module.exports = {

	loginUser : function(req, res, next) {
		passport.authenticate('local', (err, user, info) => {
		  	if(err){
		  		res.json({ code: -1 , err: err});
		  	}else{
		  		jwt.sign({user:user}, process.env.SECRET_KEY , (err, token) =>{
		  			if(err){
		  				res.json({ code: -1 , err: err});
		  			}else{
		  				if(user){
		  					if(user.isConfirmed) {
				  				res.json({
				  					token,
				  					user,
				  					info
				  				});			  					
		  					}else {
		  						res.status(401).send("User not confirmed")
		  					}
		  				}else{
		  					res.status(401).send("Incorrect username or password.");
		  				}
		  			}
		  		});
		  	}

	    })(req, res, next);


	},

	registerUser: function(req, res) {
		User.register( new User( {username:req.body.username} ), req.body.password)
		.then( ( user ) => {
			passport.authenticate("local")(req, res, function(){
				jwt.sign({user:user}, process.env.CONFIRMATION_SECRET_KEY , (err, token) =>{
					if(err) {

						res.json({code:-1 , err:err});
					}else{

						//sending email
						// .......
						const mailOptions = {
							from: 'test@feedback.com',
							to : user.username + "@cin.ufpe.br",
							subject: "Register Confirmation",
							html: '<a href = "http://localhost:3000/confirm/' + token + '">Click Here to Confirm registration</a>'
						}

						transporter.sendMail(mailOptions, (err, info) => {
							if(err){
								return console.log(err);
							}else{
								return console.log(info);
							}
						});
						// .......
						res.json({
							user
						})
					}
				});
	        });
		}).catch((err) => {
			res.json({code:-1 , err:err});
		});
	},

	confirmUser: function(req, res) {
		jwt.verify(req.params.token, process.env.CONFIRMATION_SECRET_KEY , (err, authData) => {
			if(err){
				res.json({code: -1 , err : err});
			}else{
				User.findById(authData.user._id).then( (foundUser ) => {
					foundUser.isConfirmed = true;
					foundUser.save();
					res.json(foundUser);
				}).catch( (err) => {
					res.json({code: -1 , err : err});
				})
			}
		});
	}



}
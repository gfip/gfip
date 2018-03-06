const User = require("../models/user.js");
const jwt  = require("jsonwebtoken");
const passport = require("passport");
const mailer = require("../modules/email")

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
				  					token
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
		.then( (user) => {
			passport.authenticate("local")(req, res, function(){
				jwt.sign({user:user}, process.env.CONFIRMATION_SECRET_KEY , (err, token) =>{
					if(err) {
						res.json({code:-1 , err:err});  //isso aqui é temporario, se pá tem jwt com promises e logo mais implementa.
					}else{
						var username = user.username;
						res.json("Succesfully Registered")
						mailer.sendConfirmation(user, token).catch((err) => res.json({code:-1 , err:err})); //isso aqui é temporario, se pá tem jwt com promises e logo mais implementa.
					}
				});
	        });
		})
		.catch((err) => {
			res.json({code:-1 , err:err});
		});
	},

	confirmUser: function(req, res) {
		jwt.verify(req.params.token, process.env.CONFIRMATION_SECRET_KEY , (err, authData) => {
			if(err){
				console.log(err);
				res.json({code: -1 , err : err});
			}else{
				User.findById(authData.user._id).then( (foundUser ) => {
					foundUser.isConfirmed = true;
					foundUser.save();
					var username = foundUser.username;
					res.json( { msg:"Succesfully Confirmed User", username:username});
				}).catch( (err) => {
					res.json({code: -1 , err : err});
				})
			}
		});
	},

	getUser: function(req, res){
		User.findById(req.authData.user._id).then( (foundUser) => {
			var username = foundUser.username;
			var students = foundUser.students;
			res.json({username, students});
		}).catch( (err) => {
			res.json({code: -1, err})
		});
	}



}
const User = require("../models/user.js");
const jwt  = require("jsonwebtoken");
const passport = require("passport");


module.exports = {

	loginUser : function(req, res, next) {
		passport.authenticate('local', (err, user, info) => {
		  	if(err){
		  		res.json(err);
		  	}else{
		  		jwt.sign({user:user}, process.env.SECRET_KEY , (err, token) =>{
		  			if(err){
		  				res.json(err);
		  			}else{
		  				if(user){
			  				res.json({
			  					token,
			  					user,
			  					info
			  				});
			  					
		  				}else{
		  					res.sendStatus(403);
		  				}
		  			}
		  		});
		  	}

	    })(req, res, next);


	},

	registerUser: function(req, res, next) {
		User.register( new User( {username:req.body.username} ), req.body.password)
		.then( (user) => {
			passport.authenticate("local")(req, res, function(){
	        	res.json(user);
	        });
		}).catch((err) => {
			console.log(err);
		});
	}



}
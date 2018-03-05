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
						throw new Error(err);
						// res.json({code:-1 , err:err});
					}else{

						//sending email
						// .......
						// const mailOptions = {
						// 	from: 'test@feedback.com',
						// 	to : user.username + "@cin.ufpe.br",
						// 	subject: "Register Confirmation",
						// 	html: '<a href = "http://localhost:5000/api/confirm/' + token + '">Click here to confirm registration</a>'
						// }
						
						// transporter.sendMail(mailOptions, (err, info) => {
						// 	if(err){
						// 		return console.log(err);
						// 	}else{
						// 		return console.log(info);
						// 	}
						// });
						// .......

						return mailer.sendConfirmation(user, token);
					}
				});
	        });
		})
		.then((info) => console.log(info))
		.catch((err) => {
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
					var username = foundUser.username;
					res.json( { msg:"Succesfully Confirmed User", username:username});
				}).catch( (err) => {
					res.json({code: -1 , err : err});
				})
			}
		});
	},

	getUser: function(req, res){
		res.json({
			username : req.authData.user.username,
			students :req.authData.user.students
		});
	}



}
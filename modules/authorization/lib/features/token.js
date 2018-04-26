const jwt = require("jwt-then");
const User = require(__base + "models/user.js")
const loginKey = require(__base + "config/constants.js").authentication.loginKey;
// to gain acess send Authorization header in the format Bearer <token>


module.exports = async function(req, res, next) {
	try{
		var bearerHeader = req.headers['authorization'];


		if(bearerHeader){
			var bearer = bearerHeader.split(' ');
			
			var bearerToken = bearer[1];

			req.token = bearerToken;

			var authData = await jwt.verify(req.token, loginKey);
			req.authData = authData;
			var foundUser = await User.findById(authData.user._id);
			if(foundUser){
				next();
			}else{
				return res.status(500).send(err.message);
			}

		} else {
			res.status(401).send("You need to be logged in to that");
		}
	}catch(err){
		res.status(500).send(err.message);
	}

}

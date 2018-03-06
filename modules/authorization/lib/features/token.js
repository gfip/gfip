const jwt = require("jwt-then");

const loginKey = require("../../../../config/constants.js").authentication.loginKey;
// to gain acess send Authorization header in the format Bearer <token>


module.exports =  function(req, res, next) {
	var bearerHeader = req.headers['authorization'];

	if(bearerHeader){
		var bearer = bearerHeader.split(' ');
		
		var bearerToken = bearer[1];

		req.token = bearerToken;

		jwt.verify(req.token, loginKey).then( (authData) => {
			req.authData = authData;
			next();
		}).catch( (err) => {
			console.log(err);	
			res.json({code:-1, err});
		});

	} else {
		res.status(401).send("You need to be logged in to that");
	}

}

const jwt = require("jsonwebtoken");

// to gain acess send Authorization header in the format Bearer <token>


module.exports =  function(req, res, next) {
	var bearerHeader = req.headers['authorization'];

	if(bearerHeader){
		var bearer = bearerHeader.split(' ');
		
		var bearerToken = bearer[1];

		req.token = bearerToken;

		jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
			if(err){
				res.sendStatus(403);
			}else{
				next();
			
			}
	});

	} else {
		res.sendStatus(403);
	}

}

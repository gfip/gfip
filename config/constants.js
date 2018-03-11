require("dotenv").config();

module.exports = {

    authentication :{
    	loginKey : process.env.SECRET_KEY,
    	confirmationKey: process.env.CONFIRMATION_SECRET_KEY	
    },

    email : {
    	emailUser: process.env.EMAIL_USER,
    	emailPassword: process.env.EMAIL_PASSWORD
    },

    thehuxley: {
        username: process.env.THEHUXLEY_USERNAME,
        password: process.env.THEHUXLEY_PASSWORD
    },

    address: process.env.ADDRESS
}
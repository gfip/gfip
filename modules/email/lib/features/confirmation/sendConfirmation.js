const transporter = require("../transporter");
const getOptions = require("../options");
const table = require("./table");

module.exports = function(user, token) {

    return new Promise((resolve, reject) => {
        let options = getOptions(user, table(token))
        transporter.sendMail(options, function(err, info){
            if(err){
                reject(err);
            } else {
                resolve(info);
            }
        })
    })
}
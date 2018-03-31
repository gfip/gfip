const transporter = require("../transporter");
const getOptions = require("../options");
const table = require("./table");

module.exports = function(report, student) {

    return new Promise((resolve, reject) => {
        let options = getOptions(student, table(report, student) ,"Feedback " + report.list.title);
        transporter.sendMail(options, function(err, info){
            if(err){
                reject(err);
            } else {
                resolve(info);
            }
        })
    })
}
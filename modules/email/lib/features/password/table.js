var address = require(__base + "/config/constants.js").address;

module.exports = function(token) {
    return ` To reset your password <a href = "${address}/me/reset/${token}">click here</a>
    `
}
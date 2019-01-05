var { address } = require(__base + '/config/constants.js');

module.exports = token => `To reset your password <a href = "${address}/me/reset/${token}">click here</a>`;

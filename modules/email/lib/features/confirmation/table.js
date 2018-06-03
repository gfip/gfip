const { address } = require(__base + '/config/constants.js');

module.exports = token =>
  ` <h3>You succesfully registered on GFIP!</h3>
    <p>
    <p>if you registered on the app:</p>
    <a href = "${address}/api/confirm/${token}">Click here to confirm</a>
    </p>
    <p>
    <p>if wasnt you who registered:</p>
    <a href = "${address}/api/cancel/${token}">Click here to cancel</a>
    </p>
    `;

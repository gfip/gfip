module.exports = function(user, table) {
    const mailOptions = {
        from: 'test@feedback.com',
        to : user.username + "@cin.ufpe.br",
        subject: "Register Confirmation",
        html: table
    }
}
module.exports = function(user, table) {
    return {
        from: 'test@feedback.com',
        to : user.username + "@cin.ufpe.br",
        subject: "Register Confirmation",
        html: table
    }
}
module.exports = function(user, table, subject) {
    return {
        from: 'Monitoria IP <monitoriaipccufpe@gmail.com>',
        to : user.username + "@cin.ufpe.br",
        subject: subject,
        html: table
    }
}
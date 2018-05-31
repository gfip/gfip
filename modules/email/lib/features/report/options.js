module.exports = function(student, table, list, user) {
    return {
        from: `Monitoria IP <monitoriaipccufpe@gmail.com>`,
        to :`${student.username}@cin.ufpe.br`,
        cc : `${user.username}@cin.ufpe.br`,
        subject: `Feedback ${list}`,
        html: table
    }
}
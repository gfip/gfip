module.exports = (student, table, list, users) => ({
  from: 'Monitoria IP <monitoriaipccufpe@gmail.com>',
  to: `${student.username}@cin.ufpe.br`,
  cc: users.reduce((acc, user) => acc + `${user.username}@cin.ufpe.br,`, ''),
  subject: `Feedback ${list}`,
  html: table,
});

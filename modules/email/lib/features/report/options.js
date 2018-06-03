module.exports = (student, table, list, user) => ({
  from: 'Monitoria IP <monitoriaipccufpe@gmail.com>',
  to: `${student.username}@cin.ufpe.br`,
  cc: `${user.username}@cin.ufpe.br`,
  subject: `Feedback ${list}`,
  html: table,
});

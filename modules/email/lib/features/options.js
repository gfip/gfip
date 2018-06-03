module.exports = (user, table, subject) => ({
  from: 'Monitoria IP <monitoriaipccufpe@gmail.com>',
  to: `${user.username}@cin.ufpe.br`,
  subject,
  html: table,
});

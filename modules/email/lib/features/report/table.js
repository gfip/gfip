
module.exports = (report, student, user) => {
  const status = {
    CORRECT: 'Correto',
    WRONG_ANSWER: 'Errado',
    EMPTY: 'Não fez',
    EMPTY_ANSWER: 'Saída vázia',
    RUNTIME_ERROR: 'Erro de execução',
    TIME_LIMIT_EXCEEDED: 'Tempo limite execedido',
  };

  const problems = report.submissions.reduce((acc, submission) =>
    `${acc}<li><strong><a href = 'https://www.thehuxley.com/problem/${submission.problem.theHuxleyId}' >${submission.problem.name}:</a></strong> ${status[submission.evaluation]};
      <p>${submission.comment || ''}</p>
    </li>
    `, '');

  return `<p>Olá, ${student.name.split(' ')[0]}</p>
  <p> Segue o Feedback da ${report.list.title} : </p>
  <ul style = 'margin:0; padding:0'>
  ${problems}
  </ul>
  <p>${report.finalComment || ''}</p>
  Responder para ${user.username}@cin.ufpe.br
`;
};

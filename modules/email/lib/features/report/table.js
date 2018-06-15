function getStatus(submission) {
  if (submission.score === 0) {
    return 'Errado';
  } else if (submission.score < submission.problem.maxScore) {
    return 'Nota Parcial';
  }
  return 'Correto';
}


module.exports = (report, student) => {
  const problems = report.submissions.reduce((acc, submission) =>
    `${acc}<li><strong><a href = 'https://www.thehuxley.com/problem/${submission.problem.theHuxleyId}' >${submission.problem.name}:</a></strong> ${getStatus(submission)} <strong>(${submission.score.toFixed(1)})</strong>;
      <p>${submission.comment || ''}</p>
    </li>
    `, '');

  return `<p>Olá, ${student.name.split(' ')[0]}</p>
  <p> Segue o Feedback da ${report.list.title} : </p>
  <ul style = 'margin:0; padding:0'>
  ${problems}
  </ul>
  <p>${report.finalComment || ''}</p>
  <p>Pontuação total <strong>${report.score.toFixed(1)}/${report.list.totalScore.toFixed(1)}</strong></p>
  Responder para ${report.author}@cin.ufpe.br
`;
};

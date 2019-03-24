const { markdown } = require('markdown');

function getStatus(submission) {
  if (submission.problem.score === 0) {
    return 'Errado';
  } else if (submission.problem.score < submission.problem.maxScore) {
    return 'Nota Parcial';
  }
  return 'Correto';
}

module.exports = (report, student) => {
  const problems = report.submissions.reduce((acc, submission) =>
    `${acc}<li>
      <strong>
        <a href = 'https://www.thehuxley.com/problem/${submission.problem.theHuxleyId}' >${submission.problem.name}:</a>
      </strong> ${getStatus(submission)} <strong>(${submission.problem.score})</strong>;
      <p>
        ${markdown.toHTML(submission.comment || '').split('code').join('pre')}
      </p>
    </li>
    `, '');

  return `
  <p>Olá, ${student.name.split(' ')[0]}</p>
  <p> Segue o Feedback da ${report.list.title} : </p>
  <ul style = 'margin:0; padding:0'>
    ${problems}
  </ul>
  <p>${markdown.toHTML(report.finalComment || '').split('code').join('pre')}</p>
  <p>Pontuação total <strong>${report.score}/${report.list.totalScore}</strong></p>
  Responder para ${report.author}@cin.ufpe.br
`;
};

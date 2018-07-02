const { markdown } = require('markdown');

function getStatus(submission) {
  if (submission.score === 0) {
    return 'Errado';
  } else if (submission.score < submission.problem.maxScore) {
    return 'Nota Parcial';
  }
  return 'Correto';
}

function addCodePrettify(str) {
  let result = str;
  let index = result.indexOf('<code');
  while (index !== -1) {
    result = [result.slice(0, index + 5), result.slice(index + 5)].join(' class = "prettyprint"');
    index = result.indexOf('<code', index + 1);
  }
  return result;
}

module.exports = (report, student) => {
  const problems = report.submissions.reduce((acc, submission) =>
    `${acc}
    <li>
      <strong>
        <a href = 'https://www.thehuxley.com/problem/${submission.problem.theHuxleyId}' >${submission.problem.name}:</a>
      </strong> ${getStatus(submission)} <strong>(${submission.score.toFixed(1)})</strong>;
      <p>
        <pre style = 'font-size: 12px; color: black;'>${addCodePrettify(markdown.toHTML(submission.comment || ''))}</pre>
      </p>
    </li>
    `, '');

  return `
  <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
  <p>Olá, ${student.name.split(' ')[0]}</p>
  <p> Segue o Feedback da ${report.list.title} : </p>
  <ul style = 'margin:0; padding:0'>
    ${problems}
  </ul>
  <p><pre style = 'font-size: 12px; color: black;' >${addCodePrettify(markdown.toHTML(report.finalComment || ''))}</pre></p>
  <p>Pontuação total <strong>${report.score.toFixed(1)}/${report.list.totalScore.toFixed(1)}</strong></p>
  Responder para ${report.author}@cin.ufpe.br
`;
};

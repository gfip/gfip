
module.exports = function(report, student){
	var subs = "";
	var	status = {
		"CORRECT" : "Correto",
		"WRONG_ANSWER" : "Errado",
		"EMPTY": "Não fez",
		"RUNTIME_ERROR": "Erro de execução",
	}

	report.submissions.forEach(function(sub){
		subs += `<li><strong><a href = 'https://www.thehuxley.com/problem/${sub.problem.theHuxleyId}' >${sub.problem.name}:</a></strong> ${status[sub.evaluation]};
			<p>${sub.comment || ""}</p>
		</li>
		`
	});

	return `
		<p>Olá, ${student.name}</p>
		<p> Segue o Feedback da ${report.list.title} : </p>
		<ul style = 'margin:0; padding:0'>
		${subs}
		</ul>
		<p>${report.finalComment || ""}</p>
	`
}
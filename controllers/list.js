const List = require ("../models/list.js");
const thehuxley = require("../modules/thehuxley/");


module.exports = {
 	getNewLists: async function (req, res){
		try{
			let lists = await thehuxley.getFilteredLists();
			for(let list of lists){
				let foundList = await List.findOne({theHuxleyId: list.id});
				if(!foundList){
					let problems = await thehuxley.getListProblems(list.id);
					let refactoredProblems = await problems.data.map(function(problem) {
						return { 
							name : problem.name,
							theHuxleyId : problem.id,
							score : problem.score
						};
					});
					let createdList = await List.create({
						title : list.title,
						theHuxleyId : list.id,
						totalScore : list.score,
						endDate : list.endDate,
						problems : refactoredProblems
					});
				}
			}
		}catch (err) {
			console.log(err);
		}
	}


}
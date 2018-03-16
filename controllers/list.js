const List = require ("../models/list.js");
const Student = require("../models/student.js");
const theHuxley = require("../modules/thehuxley/");
const _ = require("lodash");

module.exports = {
 	getNewLists: async function (req, res){
		try{
			let lists = await theHuxley.getFilteredLists();
			for(let list of lists){
				let foundList = await List.findOne({theHuxleyId: list.id});
				if(!foundList){
					let problems = await theHuxley.getListProblems(list.id);
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
	},

	getStudentList: async function (req, res) {
		try{
			let foundList = await List.findById(req.params.list_id);
			if(foundList){
				let foundStudent = await Student.findById(req.params.student_id);
				for(var i = 0 ; i < foundList.problems.length ; i++){
					let submissions = await theHuxley.getStudentSubmissions(foundList.problems[i].theHuxleyId, foundStudent.theHuxleyId);
					if(submissions.data[0]){
						let filtered = _.filter(submissions.data,(submission) => {
							return submission.evaluation === "CORRECT";
						});
						let mainSubmission = filtered[0] || submissions.data[0];
					}else{
						//let mainSubmission = {foundList.problems[i], status: "EMPTY"};
						console.log("EMPTY");
					}
				}

			}
			
			
		}catch(err){
			return res.json({code:-1, err:err.message});
		}			
	}


}
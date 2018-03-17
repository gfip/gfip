const List = require ("../models/list.js");
const Student = require("../models/student.js");
const theHuxley = require("../modules/thehuxley/");
const _ = require("lodash");

module.exports = {
 	getNewLists: async function (){
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

	getStudentList: async function ( studentId, listId) {
		try{
			let foundList = await List.findById(listId);
			var studentList = {list:{},student:{},submissions:[]};
			studentList.list = { 
				title: foundList.title,
				theHuxleyId: foundList.theHuxleyId,
				totalScore: foundList.totalScore,
				endDate: foundList.endDate
			};
			if(foundList){
				let foundStudent = await Student.findById(studentId);
				studentList.student = {
					name: foundStudent.name,
					login: foundStudent.login,
					theHuxleyId: foundStudent.theHuxleyId
				}
				for(var i = 0 ; i < foundList.problems.length ; i++){
					let submissions = await theHuxley.getStudentSubmissions(foundList.problems[i].theHuxleyId, foundStudent.theHuxleyId);
					if(submissions.data[0]){
						let filtered = _.filter(submissions.data,(submission) => {
							return submission.evaluation === "CORRECT";
						});
						var mainSubmission = filtered[0] || submissions.data[0];
					}else{
						var mainSubmission = {evaluation: "EMPTY", id: 0000};
					}

					var newSubmission = {
						problem: {
							name: foundList.problems[i].name,
							theHuxleyId: foundList.problems[i].theHuxleyId,
							score: foundList.problems[i].score
						},
						theHuxleyId: mainSubmission.id,
						evaluation: mainSubmission.evaluation
					}
					studentList.submissions.push(newSubmission);

				}
				return studentList;
			}
		}catch(err){
			return res.json({code:-1, err:err.message});
		}			
	}


}
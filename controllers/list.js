const List = require ("../models/list.js");
const Student = require("../models/student.js");
const theHuxley = require("../modules/thehuxley/");
const _ = require("lodash");

module.exports = {
 	getNewLists: async function (req, res){
		try{
			const requestedLists = await theHuxley.getFilteredLists();
			const dbLists = await List.find({});
			await Promise.all( requestedLists.map( async (newList) => {
				if(!dbLists.find( dbList => dbList.theHuxleyId === newList.id)){
					const problems = await theHuxley.getListProblems(newList.id);
					const refactoredProblems = await problems.data.map(function(problem) {
						return { 
							name : problem.name,
							theHuxleyId : problem.id,
							score : problem.score
						};
					});
					const createdList = await List.create({
						title : newList.title,
						theHuxleyId : newList.id,
						totalScore : newList.score,
						endDate : newList.endDate,
						problems : refactoredProblems
					});
					dbLists.push(createdList);
				}
			}));
			return res.json(dbLists);
		}catch (err) {
			throw new Error(err.message);
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
			throw new Error(err.message);
		}			
	},
	
	getSubmissionCode: async function (submissionHuxleyId){
		try{
			let foundCode = await theHuxley.getSubmissionCode(submissionHuxleyId);
			return foundCode.data;
		}catch(err){
			throw new Error(err.message);
		}

	}

}
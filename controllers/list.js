const List = require('../models/list.js');
const Student = require('../models/student.js');
const theHuxley = require('../modules/thehuxley/');
const moment = require('moment');

module.exports = {
  getNewLists: async (req, res) => {
    try {
      const requestedLists = await theHuxley.getFilteredLists();
      let dbLists = await List.find({});
      await Promise.all(dbLists = dbLists.filter(async (dbList) => {
        if (!requestedLists.find(requestedList => requestedList.id === dbList.theHuxleyId)) {
          await List.findByIdAndRemove(dbList);
          return false;
        }
        return true;
      }));
      await Promise.all(requestedLists.map(async (newList) => {
        if (!dbLists.find(dbList => dbList.theHuxleyId === newList.id)) {
          const problems = await theHuxley.getListProblems(newList.id);
          const refactoredProblems = await problems.data.map(problem => ({
            name: problem.name,
            theHuxleyId: problem.id,
            score: problem.score,
          }));
          const createdList = await List.create({
            title: newList.title,
            theHuxleyId: newList.id,
            totalScore: newList.score,
            endDate: newList.endDate,
            problems: refactoredProblems,
          });
          dbLists.push(createdList);
        }
      }));
      return res.json(dbLists);
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getStudentList: async (studentId, listId) => {
    try {
      const foundList = await List.findById(listId);
      const studentList = {
        submissions: [],
      };
      studentList.list = {
        title: foundList.title,
        theHuxleyId: foundList.theHuxleyId,
        totalScore: foundList.totalScore,
        endDate: foundList.endDate,
      };
      if (foundList) {
        const foundStudent = await Student.findById(studentId);
        studentList.student = {
          name: foundStudent.name,
          login: foundStudent.login,
          theHuxleyId: foundStudent.theHuxleyId,
        };
        for (let i = 0; i < foundList.problems.length; i += 1) {
          const submissions = await theHuxley.getStudentSubmissions(
            foundList.problems[i].theHuxleyId,
            foundStudent.theHuxleyId,
          );
          const onDateSubmissions = submissions.data
            .filter(submission => moment(submission.submissionDate) < moment(foundList.endDate));
          let mainSubmission = { evaluation: 'EMPTY', id: 0 };
          if (onDateSubmissions.length > 0) {
            const correctSubmission = onDateSubmissions.find(submission => submission.evaluation === 'CORRECT');
            mainSubmission = correctSubmission || submissions.data[0];
          }
          const newSubmission = {
            tries: onDateSubmissions.length,
            problem: {
              name: foundList.problems[i].name,
              theHuxleyId: foundList.problems[i].theHuxleyId,
              score: foundList.problems[i].score,
            },
            theHuxleyId: mainSubmission.id,
            evaluation: mainSubmission.evaluation,
          };
          studentList.submissions.push(newSubmission);
        }
        return studentList;
      }
      throw new Error('List not found');
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getSubmissionCode: async (submissionHuxleyId) => {
    try {
      const foundCode = await theHuxley.getSubmissionCode(submissionHuxleyId);
      return foundCode.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

};

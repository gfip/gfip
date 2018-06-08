const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  list: {
    title: String,
    theHuxleyId: Number,
    totalScore: Number,
    endDate: String,
  },
  score: Number,
  submissions: [
    {
      problem: {
        name: String,
        maxScore: Number,
      },
      score: Number,
      evaluation: String,
      comment: String,
    },
  ],
  finalComment: String,
  author: String,
});

module.exports = mongoose.model('Report', reportSchema);

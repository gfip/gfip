const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  list: {
    title: String,
    theHuxleyId: Number,
    totalScore: Number,
    endDate: String,
  },
  submissions: [
    {
      problem: {
        name: String,
        score: Number,
      },
      evaluation: String,
      comment: String,
    },
  ],
  finalComment: String,
  author: String,
});

module.exports = mongoose.model('Report', reportSchema);

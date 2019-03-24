const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  list: {
    title: String,
    theHuxleyId: Number,
    totalScore: Number,
    endDate: String,
  },
  student: {
    name: String,
    login: String,
    theHuxleyId: Number,
  },
  score: Number,
  submissions: [
    {
      problem: {
        name: String,
        score: Number,
        theHuxleyId: Number,
        maxScore: Number,
      },
      tries: Number,
      evaluation: String,
      comment: String,
      theHuxleyId: Number,
      code: String,
    },
  ],
  finalComment: String,
  author: String,
  sent: { type: Boolean, default: false },
});

module.exports = mongoose.model('Report', reportSchema);

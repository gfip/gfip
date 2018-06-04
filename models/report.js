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
        tries: Number,
        theHuxleyId: Number,
      },
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

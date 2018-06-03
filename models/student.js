const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: String,
  username: String,
  theHuxleyId: Number,
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
});

module.exports = mongoose.model(' Student', studentSchema);

const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  fingerprint: { type: String, required: true },
  color: { type: String, required: true, enum: ['red', 'green', 'blue'] }
});

module.exports = {
  Vote: mongoose.model('Vote', voteSchema)
};

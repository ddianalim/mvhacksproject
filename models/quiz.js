const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  belief: { type: Number, required: true },
});

module.exports = mongoose.model('Quiz', QuizSchema);

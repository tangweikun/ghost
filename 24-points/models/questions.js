const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
  openid: String,
  question: Array,
  isCorrect: Boolean,
  gameplay: String,
  createdAt: Date,
});

const QuestionsModel = mongoose.model('24-questions', QuestionsSchema);

module.exports = QuestionsModel;

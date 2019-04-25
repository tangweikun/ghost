const QuestionsModel = require('../models/questions');

function addQuestionPro(ctx) {
  const { openid, question, isCorrect, gameplay } = ctx.request.body;

  QuestionsModel({
    createdAt: new Date(),
    openid,
    question,
    isCorrect,
    gameplay,
  }).save();

  return {};
}

module.exports = { addQuestionPro };

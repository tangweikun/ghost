import QuestionsModel from '../models/questions';

export function addQuestionPro(ctx) {
  const { openid, question, isCorrect, gameplay } = ctx.request.body;

  QuestionsModel({
    createdAt: new Date(),
    openid,
    question,
    isCorrect,
    gameplay,
  }).save();

  ctx.body = {};
}

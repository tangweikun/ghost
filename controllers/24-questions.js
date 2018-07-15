import QuestionsModal from '../models/24-questions'

export function addQuestion(ctx) {
  const { openid, question, isCorrect, gameplay } = ctx.request.body

  QuestionsModal({
    createdAt: new Date(),
    openid,
    question,
    isCorrect,
    gameplay,
  }).save()

  ctx.body = {}
}

import TypingModel from '../models/Typing'

export async function findTyping(ctx) {
  await TypingModel.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .exec((err, result) => {
      if (err) {
        console.log(err)
      } else {
        ctx.body = result
      }
    })
}

export function insertTyping(ctx) {
  const { startAt, endAt, wpm } = ctx.request.body
  TypingModel({ startAt, endAt, wpm, createdAt: new Date() }).save()
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
}

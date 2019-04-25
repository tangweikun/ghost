const TypingModel = require('../models/typing');

async function findTyping(ctx) {
  let res = null;
  const foo = await TypingModel.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .exec();
  console.log(res, '===');
  return foo;
  // return res;
}

function insertTyping(ctx) {
  const { startAt, endAt, wpm } = ctx.request.body;
  TypingModel({ startAt, endAt, wpm, createdAt: new Date() }).save();
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
}

module.exports = { findTyping, insertTyping };

const ChallengeModel = require('../models/challenges');

function addChallengePro(ctx) {
  const {
    userInfo = {},
    openid,
    record,
    gameplay,
    totalTime,
  } = ctx.request.body;

  ChallengeModel({
    createdAt: new Date(),
    openid,
    record,
    userInfo,
    gameplay,
    totalTime,
  }).save();

  return {};
}

module.exports = { addChallengePro };

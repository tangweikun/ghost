import ChallengeModel from '../models/challenges';

export function addChallenge(ctx) {
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

  ctx.body = {};
}

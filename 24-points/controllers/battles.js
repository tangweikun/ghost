import BattleModeModel from '../models/battles';

export function addBattlePro(ctx) {
  const {
    userInfo,
    openid,
    myScore,
    rivalScore,
    result,
    rivalUserInfo,
  } = ctx.request.body;

  BattleModeModel({
    createdAt: new Date(),
    openid,
    myScore,
    rivalScore,
    userInfo,
    result,
    rivalUserInfo,
  }).save();

  ctx.body = {};
}

const BattleModeModel = require('../models/battles');

function addBattle(ctx) {
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

  return {};
}

async function getMyBattleList(ctx) {
  const { openid } = ctx.request.body;
  return await BattleModeModel.find({ openid })
    .sort({ createdAt: -1 })
    .exec();
}

module.exports = { addBattle, getMyBattleList };

const superagent = require('superagent');
const WXUsersModel = require('../models/wx-users');

async function getUserInfo(ctx) {
  const { openid } = ctx.request.body;

  const result = await WXUsersModel.findOne({ openid });

  const totalRank = await WXUsersModel.aggregate([
    {
      $match: {
        totalOfCorrectAnswers: { $gt: result.totalOfCorrectAnswers },
      },
    },
    { $count: 'rank' },
  ]);

  const rank = totalRank[0] ? totalRank[0].rank + 1 : 1;

  return {
    totalOfAnswers: result.totalOfAnswers,
    totalOfCorrectAnswers: result.totalOfCorrectAnswers,
    userInfo: result.userInfo,
    rank,
  };
}

async function increaseAnswersCount(ctx) {
  const { openid, isCorrect } = ctx.request.body;

  return await WXUsersModel.findOneAndUpdate(
    { openid },
    { $inc: { totalOfAnswers: 1, totalOfCorrectAnswers: isCorrect ? 1 : 0 } },
  ).exec();
}

async function updateUserInfo(ctx) {
  const { openid, userInfo } = ctx.request.body;
  return await WXUsersModel.findOneAndUpdate(
    { openid },
    { $set: { userInfo } },
  ).exec();
}

async function createUser(ctx) {
  const { code } = ctx.request.body;
  const baseUrl = 'https://api.weixin.qq.com/sns/jscode2session';
  const appid = process.env.APPID;
  const secret = process.env.SECRET;
  const res = await superagent.get(
    `${baseUrl}?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
  );

  const { openid } = JSON.parse(res.text);

  const result = await WXUsersModel.findOne({ openid });

  if (!result) {
    WXUsersModel({
      createdAt: new Date(),
      updatedAt: new Date(),
      totalOfCorrectAnswers: 0,
      totalOfAnswers: 0,
      openid,
    }).save();
  }

  return (
    result || {
      openid,
      userInfo: null,
      totalOfCorrectAnswers: 0,
      totalOfAnswers: 0,
    }
  );
}

module.exports = {
  getUserInfo,
  increaseAnswersCount,
  updateUserInfo,
  createUser,
};

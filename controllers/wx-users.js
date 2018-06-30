import superagent from 'superagent'
import WXUsersModel from '../models/wx-users'
import ChallengeModal from '../models/24-challenge'

export async function getUserInfo(ctx) {
  const { openid } = ctx.request.body

  const result = await WXUsersModel.findOne({ openid })
  const challenges = await ChallengeModal.find({ openid }).sort({ record: -1 })
  let bestRecord = '-'
  let challengeRanking = '-'

  if (challenges.length > 0) {
    bestRecord = challenges[0].record
    const foo = await ChallengeModal.find({
      record: { $gt: bestRecord },
    }).count()
    challengeRanking = foo + 1
  }

  ctx.body = {
    totalOfAnswers: result.totalOfAnswers,
    totalOfCorrectAnswers: result.totalOfCorrectAnswers,
    userInfo: result.userInfo,
    challengeRanking,
    bestRecord,
  }
}

export async function increaseAnswersCount(ctx) {
  const { openid, isCorrect } = ctx.request.body
  console.log('increaseAnswersCount')
  await WXUsersModel.findOneAndUpdate(
    { openid },
    { $inc: { totalOfAnswers: 1, totalOfCorrectAnswers: isCorrect ? 1 : 0 } },
  ).exec((err, result) => {
    if (err) {
      console.log(err)
    } else {
      ctx.body = result
    }
  })
}

export async function updateUserInfo(ctx) {
  const { openid, userInfo } = ctx.request.body
  await WXUsersModel.findOneAndUpdate({ openid }, { $set: { userInfo } }).exec(
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        ctx.body = result
      }
    },
  )
}

export async function createUser(ctx) {
  const { code } = ctx.request.body
  const baseUrl = 'https://api.weixin.qq.com/sns/jscode2session'
  const appid = process.env.APPID
  const secret = process.env.SECRET
  const res = await superagent.get(
    `${baseUrl}?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
  )

  const { openid } = JSON.parse(res.text)

  await WXUsersModel.findOne({ openid }).exec(function(err, result) {
    if (!result) {
      ctx.body = {
        openid,
        userInfo: null,
        totalOfCorrectAnswers: 0,
        totalOfAnswers: 0,
      }
      WXUsersModel({
        createdAt: new Date(),
        updatedAt: new Date(),
        totalOfCorrectAnswers: 0,
        totalOfAnswers: 0,
        openid,
      }).save()
    } else {
      ctx.body = result
    }
  })
}

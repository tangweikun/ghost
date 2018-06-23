import superagent from 'superagent'
import WXUsersModel from '../models/wx-users'

export async function getUserInfo(ctx) {
  const { openid } = ctx.request.body

  const result = await WXUsersModel.findOne({ openid })

  const ranking = await WXUsersModel.find({
    totalOfCorrectAnswers: { $gt: result.totalOfCorrectAnswers },
  }).count()

  ctx.body = {
    totalOfAnswers: result.totalOfAnswers,
    totalOfCorrectAnswers: result.totalOfCorrectAnswers,
    ranking: ranking + 1,
    userInfo: result.userInfo,
  }
}

export async function increaseAnswersCount(ctx) {
  const { openid, isCorrect } = ctx.request.body
  console.log('==', openid)
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
  const { userInfo, code } = ctx.request.body
  console.log(code, '---', userInfo)
  const baseUrl = 'https://api.weixin.qq.com/sns/jscode2session'
  const appid = process.env.APPID
  const secret = process.env.SECRET
  const res = await superagent.get(
    `${baseUrl}?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
  )

  const { openid, session_key } = JSON.parse(res.text)

  if (openid) {
    await WXUsersModel.findOne({ openid }).exec(function(err, result) {
      if (err) {
        ctx.body = {}
        console.log(err)
      } else if (result) {
        ctx.body = result
      } else {
        WXUsersModel({
          createdAt: new Date(),
          updatedAt: new Date(),
          totalOfCorrectAnswers: 0,
          totalOfAnswers: 0,
          userInfo,
          openid,
        }).save()
        ctx.body = {
          openid,
          userInfo,
          totalOfCorrectAnswers: 0,
          totalOfAnswers: 0,
        }
      }
    })
  }
}

import superagent from 'superagent'
import WXUsersModel from '../models/wx-users'

export async function getUserInfo(ctx) {
  const { openid } = ctx.body
  await WXUsersModel.findOne({ openid }).exec((err, result) => {
    if (err) {
      console.log(err)
    } else {
      ctx.body = result
    }
  })
}

export async function increaseAnswersCount(ctx) {
  // const openid = 'osIEm0dHDbWYVr-AmTSm1qq2s2FA'
  const { openid, isCorrect } = ctx.request.body
  await WXUsersModel.findOneAndUpdate(
    { openid },
    { $inc: { totalOfAnswers: 1, totalOfCorrectAnswers: isCorrect ? 1 : 0 } },
  )
  ctx.body = {}
}

export async function createUser(ctx) {
  const { userInfo, code } = ctx.request.body
  const baseUrl = 'https://api.weixin.qq.com/sns/jscode2session'
  const appid = process.env.APPID
  const secret = process.env.SECRET
  const res = await superagent.get(
    `${baseUrl}?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
  )

  const { openid, session_key } = JSON.parse(res.text)

  if (openid) {
    WXUsersModel.findOne({ openid }).exec(function(err, result) {
      if (err) {
        console.log(err)
      } else if (result) {
        // console.log('update me')
      } else {
        WXUsersModel({
          createdAt: new Date(),
          updatedAt: new Date(),
          userInfo,
          openid,
        }).save()
      }
    })
  }

  ctx.body = { openid }
}

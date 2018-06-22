import superagent from 'superagent'
import WXUsersModel from '../models/wx-users'

// export async function findTyping(ctx) {
//   await WXUsersModel.find()
//     .limit(100)
//     .exec((err, result) => {
//       if (err) {
//         console.log(err)
//       } else {
//         ctx.body = result
//       }
//     })
// }

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

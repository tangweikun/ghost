import ChallengeModal from '../models/24-challenge'

export function addChallenge(ctx) {
  const { userInfo, openid, record } = ctx.request.body

  ChallengeModal({
    createdAt: new Date(),
    openid,
    record,
    userInfo,
  }).save()

  ctx.body = {}
}

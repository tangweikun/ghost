import ChallengeModal from '../models/24-challenge'

export function addChallenge(ctx) {
  const { userInfo, openid, record, gameplay, totalTime } = ctx.request.body
  console.log('addChallenge->gameplay', gameplay)
  ChallengeModal({
    createdAt: new Date(),
    openid,
    record,
    userInfo,
    gameplay,
    totalTime,
  }).save()

  ctx.body = {}
}

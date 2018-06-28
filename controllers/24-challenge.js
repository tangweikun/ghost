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

export async function getRanking(ctx) {
  const { openid } = ctx.request.body
  const challenges = await ChallengeModal.find().sort({ record: -1 })

  const myType1Challenges = challenges
    .filter(x => x.openid === openid && x.gameplay === 'TYPE_1')
    .sort((a, b) => b - a)

  const myType2Challenges = challenges
    .filter(x => x.openid === openid && x.gameplay === 'TYPE_2')
    .sort((a, b) => b - a)

  const type1Record = myType1Challenges[0] ? myType1Challenges[0].record : 0
  const type2Record = myType2Challenges[0] ? myType2Challenges[0].record : 0

  const type1Ranking = challenges.filter(x => x.record && x.gameplay === 'TYPE_1' > type1Record).length + 1
  const type2Ranking = challenges.filter(x => x.record && x.gameplay === 'TYPE_2' > type2Record).length + 1

  ctx.body = {
    type1Record: type1Record || '-',
    type2Record: type2Record || '-',
    type1Ranking,
    type2Ranking,
  }
}

export async function getRankingList(ctx) {
  await ChallengeModal.find({ record: { $gt: 0 } })
    .sort({ record: -1 })
    .exec((err, res) => {
      if (err) {
        console.log(err)
      } else {
        ctx.body = res
      }
    })
}

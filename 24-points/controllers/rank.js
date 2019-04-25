const RankModel = require('../models/rank');
const ChallengeModel = require('../models/challenges');
const { filterTopRank } = require('../utils/filterTopRank');

async function updateRank(ctx) {
  let filteredRank = [];
  const { gameplay = 'TYPE_1' } = ctx.request.query;

  await ChallengeModel.find({
    gameplay: decodeURIComponent(gameplay),
    userInfo: { $exists: 1 },
    record: { $gt: 5 },
  })
    .sort({ record: -1 })
    .exec((err, res) => {
      if (err) {
        console.log(err);
      } else {
        filteredRank = filterTopRank(res);
      }
    });

  const len = filteredRank.length;
  for (let i = 0; i < len; i++) {
    await RankModel.findOneAndUpdate(
      { gameplay, rank: i + 1 },
      { $set: { ...filteredRank[i] } },
      { upsert: true },
    );
  }

  return {};
}

async function getRank(ctx) {
  const { gameplay = 'TYPE_1' } = ctx.request.query;

  return await RankModel.find({
    gameplay: decodeURIComponent(gameplay),
  })
    .sort({ rank: 1 })
    .exec();
}

module.exports = { updateRank, getRank };

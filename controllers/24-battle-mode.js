import BattleModeModel from '../24-points/models/battles';

export async function getMyBattleList(ctx) {
  const { openid } = ctx.request.body;
  await BattleModeModel.find({ openid })
    .sort({ createdAt: -1 })
    .exec((err, res) => {
      if (err) {
        console.log(err);
      } else {
        ctx.body = res;
      }
    });
}

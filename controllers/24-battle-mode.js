import BattleModeModal from '../24-points/models/battles';

export function addBattle(ctx) {
  const {
    userInfo,
    openid,
    myScore,
    rivalScore,
    result,
    rivalUserInfo,
  } = ctx.request.body;

  BattleModeModal({
    createdAt: new Date(),
    openid,
    myScore,
    rivalScore,
    userInfo,
    result,
    rivalUserInfo,
  }).save();

  ctx.body = {};
}

export async function getMyBattleList(ctx) {
  const { openid } = ctx.request.body;
  await BattleModeModal.find({ openid })
    .sort({ createdAt: -1 })
    .exec((err, res) => {
      if (err) {
        console.log(err);
      } else {
        ctx.body = res;
      }
    });
}

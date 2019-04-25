const Router = require('koa-router');
const { addQuestionPro } = require('./24-points/controllers/questions');
const { addChallengePro } = require('./24-points/controllers/challenges');
const { addBattle } = require('./24-points/controllers/battles');
const { updateRank, getRank } = require('./24-points/controllers/rank');

const { findTyping } = require('./controllers/typing');
const {
  getUserInfo,
  createUser,
  increaseAnswersCount,
  updateUserInfo,
} = require('./24-points/controllers/wx-users');

const router = new Router();

router
  .get('/24-points/update_rank', async ctx => {
    ctx.body = await updateRank(ctx);
  })
  .get('/24-points/get_rank', async ctx => {
    ctx.body = await getRank(ctx);
  })
  .post('/24-points/add_question', async ctx => {
    ctx.body = await addQuestionPro(ctx);
  })
  .post('/24-points/add_challenge', async ctx => {
    ctx.body = await addChallengePro(ctx);
  })
  .post('/24-points/add_battle', async ctx => {
    ctx.body = await addBattle(ctx);
  })
  // .get('/property', findProperty)
  // .post('/property', insertProperty)
  // .post('/task', insertTask)
  // .get('/tasks', findTasks)
  // .post('/task/update', updateTask)
  // .post('/task/delete', deleteTask)
  .get('/typing', async ctx => {
    ctx.body = await findTyping();
  })
  // .post('typing', insertTyping)
  .post('/createUser', async ctx => {
    ctx.body = await createUser(ctx);
  })
  .post('/getUserInfo', async ctx => {
    ctx.body = await getUserInfo(ctx);
  })
  .post('/increaseAnswersCount', async ctx => {
    ctx.body = await increaseAnswersCount(ctx);
  })
  .post('/updateUserInfo', async ctx => {
    ctx.body = await updateUserInfo(ctx);
  });
// .post('/addChallenge', addChallenge)
// .post('/getRankingList', getRankingList)
// .post('/getRanking', getRanking)
// .post('/getMyBattleList', getMyBattleList)
// .post('/getRankingList1', getRankingList1)
// .post('/getRankingList2', getRankingList2)
// .post('/addQuestion', addQuestion)
// .get('/getRanking1', getRanking1)
// .get('/getRanking2', getRanking2);

module.exports = router;

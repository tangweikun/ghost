import Router from 'koa-router';
import { addQuestion } from './24-points/controllers/questions';
import { addChallenge } from './24-points/controllers/challenges';
import { addBattle } from './24-points/controllers/battles';
import { updateRank, getRank } from './24-points/controllers/rank';

import {
  findProperty,
  insertProperty,
  insertTask,
  findTasks,
  updateTask,
  deleteTask,
  findTyping,
  insertTyping,
  createUser,
  increaseAnswersCount,
  getUserInfo,
  updateUserInfo,
  getMyBattleList,
} from './controllers';

const router = new Router();

router
  .get('/24-points/update_rank', updateRank)
  .get('/24-points/get_rank', getRank)
  .post('/24-points/add_question', addQuestion)
  .post('/24-points/add_challenge', addChallenge)
  .post('/24-points/add_battle', addBattle)
  .get('/property', findProperty)
  .post('/property', insertProperty)
  .post('/task', insertTask)
  .get('/tasks', findTasks)
  .post('/task/update', updateTask)
  .post('/task/delete', deleteTask)
  .get('/typing', findTyping)
  .post('typing', insertTyping)
  .post('/createUser', createUser)
  .post('/getUserInfo', getUserInfo)
  .post('/increaseAnswersCount', increaseAnswersCount)
  .post('/updateUserInfo', updateUserInfo)
  .post('/getMyBattleList', getMyBattleList);

export default router;

import Router from 'koa-router';
import { addQuestionPro } from './24-points/controllers/questions';
import { addChallengePro } from './24-points/controllers/challenges';
import { addBattlePro } from './24-points/controllers/battles';

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
  addChallenge,
  getRankingList,
  getRanking,
  addBattle,
  getMyBattleList,
  getRankingList1,
  getRankingList2,
  addQuestion,
  getRanking1,
  getRanking2,
} from './controllers';

const router = new Router();

router
  .post('24-points/add_question', addQuestionPro)
  .post('24-points/add_challenge', addChallengePro)
  .post('24-points/add_battle', addBattlePro)
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
  .post('/addChallenge', addChallenge)
  .post('/getRankingList', getRankingList)
  .post('/getRanking', getRanking)
  .post('/addBattle', addBattle)
  .post('/getMyBattleList', getMyBattleList)
  .post('/getRankingList1', getRankingList1)
  .post('/getRankingList2', getRankingList2)
  .post('/addQuestion', addQuestion)
  .get('/getRanking1', getRanking1)
  .get('/getRanking2', getRanking2);

export default router;

import Router from 'koa-router'

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
} from './controllers'

const router = new Router()

router
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

export default router

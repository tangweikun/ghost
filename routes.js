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
export default router

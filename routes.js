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
  .post('typing', insertTask)
export default router

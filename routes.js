import Router from 'koa-router'

import {
  findProperty,
  insertProperty,
  insertTask,
  findTasks,
} from './controllers'

const router = new Router()

router
  .get('/property', findProperty)
  .post('/property', insertProperty)
  .post('/task', insertTask)
  .get('/tasks', findTasks)

export default router

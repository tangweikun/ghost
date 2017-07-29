import Router from 'koa-router'

import { findProperty, insertProperty, insertTask } from './controllers'

const router = new Router()

router
  .get('/property', findProperty)
  .post('/property', insertProperty)
  .post('/task', insertTask)

export default router

import Router from 'koa-router'

import { findProperty, insertProperty, insertTask } from './controllers'

const router = new Router()

router
  .get('/findProperty', findProperty)
  .post('/insertProperty', insertProperty)
  .post('/insertTask', insertTask)

export default router

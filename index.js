import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import mongoose from 'mongoose'
import cors from 'koa-cors'

import PropertyModel from './models/property'
import SOAPModel from './models/soap'
import TodoListModel from './models/todoList'

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)

const app = new Koa()
const router = new Router()
app.use(koaBody())
app.use(cors())
const createdAt = new Date()

router
  .get('/', (ctx) => {
    console.log('4444')
    const a = SOAPModel.findOne({})
    a.select('username')
    a.exec((err, per) => {
      console.log(per.username, '===', per, per.username)
      const d = per.toObject()
      console.log('======dd', d, d.username)
    })
    ctx.body = 'Hello World!'
  })
  .get('/findProperty', async (ctx) => {
    await PropertyModel.find()
      .sort({ date: -1 })
      .limit(100)
      .exec((err, properties) => {
        if (err) {
          console.log(err)
        } else {
          ctx.body = properties
        }
      })
  })
  .post('/insertProperty', (ctx) => {
    const { date, income, outlay } = ctx.request.body
    PropertyModel({ date, income, outlay, createdAt }).save()
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
  })
  .post('/insertTask', (ctx) => {
    const { task } = ctx.request.body
    TodoListModel({
      task,
      isDelete: false,
      isCompleted: false,
      createdAt,
    }).save()
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
  })

app.use(router.routes())
// .use(router.allowedMethods())

app.listen(4000)
console.log('[demo] start-quick is starting at port 4000')

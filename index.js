import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import mongoose from 'mongoose'
import cors from 'koa-cors'

import PropertyModel from './models/property'
import SOAPModel from './models/soap'

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)

const app = new Koa()
const router = new Router()
app.use(koaBody())
app.use(cors())

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
  .get('/t', (ctx) => {
    ctx.body = 'twk'
  })
  .post('/r', (ctx) => {
    console.log('----', JSON.parse(JSON.stringify(ctx.request.body)), ctx.request, ctx.request.url)
    console.log(ctx.state, '====', ctx.request.querystring)
    ctx.body = `Request Body: ${JSON.parse(JSON.stringify(ctx.request.body))}`
    ctx.body = 'hhhh'
  })

app
  .use(router.routes())
  // .use(router.allowedMethods())

app.listen(4000)
console.log('[demo] start-quick is starting at port 4000')

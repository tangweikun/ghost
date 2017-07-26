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
  .post('/insertProperty', (ctx) => {
    const { date, income, outcome } = ctx.request.body
    const Property = new PropertyModel({ date, income, outcome })
    Property.save()
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
  })

app.use(router.routes())
// .use(router.allowedMethods())

app.listen(4000)
console.log('[demo] start-quick is starting at port 4000')

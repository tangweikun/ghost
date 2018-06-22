import Koa from 'koa'
import koaBody from 'koa-body'
import mongoose from 'mongoose'
import cors from 'koa-cors'
import router from './routes'

require('dotenv').config()

mongoose.connect(
  process.env.MONGO_URL,
  { useMongoClient: true },
)

const app = new Koa()

app.use(koaBody())
app.use(cors())
app.use(router.routes())
// .use(router.allowedMethods())

app.listen(4000)
console.log('[demo] start-quick is starting at port 4000')

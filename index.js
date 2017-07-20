import {getDataFromMongo} from './getDataFromMongo'
import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'

const app = new Koa()
const router = new Router()
app.use(koaBody())

router
  .get('/',function (ctx, next) {
    getDataFromMongo().then(result => console.log('=====', result.length))
    ctx.body = 'Hello World!';
  })
  .get('/t', function (ctx, next) {
    ctx.body = 'twk'
  })
  .post('/r', function (ctx) {
    console.log('----', ctx, ctx.request.body)
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
    console.log('=======')
  })

app
  .use(router.routes())
  // .use(router.allowedMethods());

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')

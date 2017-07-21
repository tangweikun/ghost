import {getDataFromMongo} from './getDataFromMongo'
import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import mongoose from 'mongoose'
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL)
// var Schema = mongoose.Schema

// var SOAPSchema = new Schema({ author: String })
var Schema = mongoose.Schema;

var BearSchema = new Schema({
});
var SOAPModel = mongoose.model('user', BearSchema)
const app = new Koa()
const router = new Router()
app.use(koaBody())

router
  .get('/',function (ctx, next) {
    var a = SOAPModel.findOne({})
    a.select('username')
    a.exec(function(err, per) {
      console.log(per.username, '===', per, per.username)
      var d=per.toObject()
      console.log('======dd', d, d.username)
    })
    // console.log(a, '---')
    // getDataFromMongo().then(result => console.log('=====', result.length))
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

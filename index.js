import { getDataFromMongo } from './getDataFromMongo';
import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import mongoose from 'mongoose';

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);
// var Schema = mongoose.Schema

// var SOAPSchema = new Schema({ author: String })
const Schema = mongoose.Schema;

const BearSchema = new Schema({
});
const SOAPModel = mongoose.model('user', BearSchema);
const app = new Koa();
const router = new Router();
app.use(koaBody());

router
  .get('/', (ctx, next) => {
    const a = SOAPModel.findOne({});
    a.select('username');
    a.exec((err, per) => {
      console.log(per.username, '===', per, per.username);
      const d = per.toObject();
      console.log('======dd', d, d.username);
    });
    // console.log(a, '---')
    // getDataFromMongo().then(result => console.log('=====', result.length))
    ctx.body = 'Hello World!';
  })
  .get('/t', (ctx, next) => {
    ctx.body = 'twk';
  })
  .post('/r', (ctx) => {
    console.log('----', ctx, ctx.request.body);
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
    console.log('=======');
  });

app
  .use(router.routes());
  // .use(router.allowedMethods());

app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');

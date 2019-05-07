const Koa = require('koa');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const cors = require('koa-cors');
const router = require('./routes');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const app = new Koa();

// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

app.use(koaBody());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 4000);
console.log('[demo] start-quick is starting at port 4000');

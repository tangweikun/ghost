import {getDataFromMongo} from './getDataFromMongo'
import Koa from 'koa'

const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
  await getDataFromMongo()
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')

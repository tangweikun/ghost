import Koa from 'koa'
import koaBody from 'koa-body'
import mongoose from 'mongoose'
import cors from 'koa-cors'
// import io from 'socket.io'

import router from './routes'
import TodoListModel from './models/todoList'

require('dotenv').config()

const http = require('http')

mongoose.connect(process.env.MONGO_URL)

const app = new Koa()

app.use(koaBody())
app.use(cors())
app.use(router.routes())

const server = http.createServer(app.callback())
const io = require('socket.io')(server, {
  origins: 'http://localhost:* http://127.0.0.1:*',
  path: '/stomp',
})

io.on('connection', (socket) => {
  console.log('-------->>>>>>>>>>>>>>>')
  socket.on('chat message', async (msg) => {
    await TodoListModel.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .exec((err, tasks) => {
        if (err) {
          console.log(err)
        } else {
          console.log(msg, '---->>>')
          socket.emit('chat message', tasks)
        }
      })
  })

  socket.emit('ww', 'rrr')
  socket.on('he', msg => console.log(msg, '==='))
})

server.listen(4000)

console.log('[demo] start-quick is starting at port 4000')

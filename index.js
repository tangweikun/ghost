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
// app('/', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//   next()
// })

// .use(router.allowedMethods())
const server = http.createServer(app.callback())
const io = require('socket.io')(server, {
  origins: 'http://localhost:* http://127.0.0.1:*',
  path: '/stomp',
})

io.set('transports', ['websocket'])

io.on('connection', (socket) => {
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

// http.listen(4000)
console.log('[demo] start-quick is starting at port 4000')

// var app = require('express')()
// var http = require('http').Server(app)
//
// var allowedOrigins = 'http://localhost:* http://127.0.0.1:*'
// var path = '/stomp' // you need this if you want to connect to something other than the default socket.io path
// var io = require('socket.io')(http, { origins: allowedOrigins, path })
// var port = process.env.PORT || 4000
//
// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })
//
// io.on('connection', function(socket) {
//   socket.on('chat message', function(msg) {
//     io.emit('chat message', msg)
//   })
// })
//
// http.listen(port, function() {
//   console.log('listening on *:' + port)
// })

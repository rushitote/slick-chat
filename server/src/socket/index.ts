import * as http from 'http'
import { Server, Socket } from 'socket.io'
import passport from 'passport'
import { sessionMiddleware } from '../server/index'
import { postMessage, joinRoom, leaveRoom } from './socketOps'
import { socketRequest } from './types'

export class SocketIO {
  public io: Server

  constructor(server: http.Server) {
    this.io = new Server(server)
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)

    this.io.use(wrap(sessionMiddleware))
    this.io.use(wrap(passport.initialize()))
    this.io.use(wrap(passport.session()))
    this.io.use((socket, next) => {
      const request: any = socket.request

      if (request.user) {
        console.log('logged in')
        next()
      } else {
        console.log('unauthorized: ' + socket.id)
        next(new Error('unauthorized'))
      }
    })
    this.connect()
  }

  public connect() {
    this.io.on('connection', (socket: Socket) => {
      // tslint:disable-next-line: no-console
      console.info(` connected : ${socket.id}`)
      this.handlers(socket)
    })
  }

  public handlers(socket: Socket) {
    socket.on('disconnect', () => {
      // tslint:disable-next-line: no-console
      console.info(`Socket disconnected : ${socket.id}`)
    })

    socket.on('joinRoom', msg => {
      const { roomId } = JSON.parse(msg)
      console.log('Socket:', socket.id, 'joined', roomId)
      socket.join(roomId)
    })

    socket.on('newMessage', msg => {
      const { roomId, content } = JSON.parse(msg)
      console.log('Socket:', socket.id, 'sent', content, 'in', roomId)
      postMessage(
        socket.request as socketRequest,
        (socket.request as socketRequest).user.dataValues.username,
        content,
        roomId
      ).then(message => {
        if (message) {
          this.io.to(roomId).emit('newMessage', {
            username: (socket.request as socketRequest).user.dataValues.username,
            messageId: message.messageId,
            roomId,
            content,
            ...message,
          })
        }
      })
    })

    socket.on('userJoinRoom', body => {
      const { roomId } = JSON.parse(body)
      const username = (socket.request as socketRequest).user.dataValues.username
      if (roomId) {
        joinRoom(username, roomId).then(status => {
          if (status) {
            this.io.to(roomId).emit('userJoinRoom', { username })
          }
        })
      }
    })

    socket.on('userLeaveRoom', body => {
      const { roomId } = JSON.parse(body)
      const username = (socket.request as socketRequest).user.dataValues.username
      if (roomId) {
        leaveRoom(username, roomId).then(status => {
          if (status) {
            this.io.to(roomId).emit('userLeaveRoom', { username })
          }
        })
      }
    })
  }
}

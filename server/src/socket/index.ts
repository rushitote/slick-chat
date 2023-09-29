import * as http from 'http'
import { Server, Socket } from 'socket.io'
import passport from 'passport'
import { sessionMiddleware } from '../server/index'
import { postMessage } from './socketOps'
import { socketRequest } from './types'
import { onlineUsers } from '../index'
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

    socket.on('disconnecting', () => {
      for (const room of socket.rooms) {
        if (onlineUsers.has(room)) {
          // remove user from online Set
          onlineUsers.get(room).delete((socket.request as socketRequest).user.dataValues.username)

          // emit an event to all users in the room that the user has disconnected
          socket.to(room).emit('changeUserStatus', {
            username: (socket.request as socketRequest).user.dataValues.username,
            online: false,
          })
        }
      }
    })

    socket.on('joinRoom', msg => {
      const { roomId } = JSON.parse(msg)
      console.log('Socket:', socket.id, 'joined', roomId)
      socket.join(roomId)

      if (!onlineUsers.has(roomId)) {
        // if the room doesn't exist, create it
        onlineUsers.set(roomId, new Set([(socket.request as socketRequest).user.dataValues.username]))
      } else {
        // add user to online Set
        onlineUsers.get(roomId).add((socket.request as socketRequest).user.dataValues.username)
      }
      // emit online event
      this.io.to(roomId).emit('changeUserStatus', {
        username: (socket.request as socketRequest).user.dataValues.username,
        online: true,
      })
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

    socket.on('typing', msg => {
      const { roomId, typing } = JSON.parse(msg)
      this.io.to(roomId).emit('typing', {
        username: (socket.request as socketRequest).user.dataValues.username,
        roomId,
        typing,
      })
    })
  }
}

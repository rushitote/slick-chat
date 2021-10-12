import * as http from 'http'
import { Server, Socket } from 'socket.io'

export class SocketIO {
  public io: Server

  constructor(server: http.Server) {
    this.io = new Server(server)
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
      socket.broadcast.to(roomId).emit('newMessage', { roomId, content })
    })
  }
}

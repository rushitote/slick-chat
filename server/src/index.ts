require('dotenv').config()
import * as http from 'http'
import { PORT } from './var/config'
import { SocketIO as Socket } from './socket/index'
import app from './server'

const server: http.Server = http.createServer(app)
const socket = new Socket(server)

server.listen(PORT)

server.on('error', (e: Error) => {
  console.log('Error starting server' + e)
})

server.on('listening', () => {
  console.log(
    `Server started on port ${PORT} on env ${process.env.NODE_ENV || 'dev'}`
  )
})

export {
  server,
  socket,
}

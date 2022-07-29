import { createContext } from 'react'
import { Socket } from 'socket.io-client'

interface socketContextInterface {
  socket: Socket | undefined
  roomId: string
  roomName: string
}

const socketContext = createContext<socketContextInterface>({
  socket: undefined,
  roomId: ' ',
  roomName: ' ',
})

export default socketContext

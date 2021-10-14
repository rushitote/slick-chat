import { createContext } from 'react'
import { Socket } from 'socket.io-client'

interface socketContextInterface {
  socket: Socket | undefined
  roomId: String
}

const socketContext = createContext<socketContextInterface>({
  socket: undefined,
  roomId: 'undefined',
})

export default socketContext

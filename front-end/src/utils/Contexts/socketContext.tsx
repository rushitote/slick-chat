import { createContext } from 'react'
import { Socket } from 'socket.io-client'
import { User } from '../../Interfaces/Responses'

export interface socketContextInterface {
  socket?: Socket
  roomId?: string
  roomName?: string
  roomOwner?: User
}

const socketContext = createContext<socketContextInterface>({})

export default socketContext

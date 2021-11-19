import { createContext } from 'react'
import { User } from '../../Interfaces/Responses'
export interface Message {
  messageId: string
  content: string
  userId: string
  roomId: string
  unixTime: number
  username: string
  image?: string
}

interface globalContext {
  messages: Message[]
  sendMessage: Function
  users: User[]
  loading?: boolean
  refreshMessages: Function
}

const messageContext = createContext<globalContext>({
  messages: [],
  sendMessage: (message: Message) => {},
  users: [],
  loading: false,
  refreshMessages: async (roomId: string, lastMessage: Message) => {},
})

export default messageContext

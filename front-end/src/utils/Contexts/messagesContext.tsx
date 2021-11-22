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
  users: User[]
  loading?: boolean
  refreshMessages: Function
  isRefreshing: boolean
}

const messageContext = createContext<globalContext>({
  messages: [],
  users: [],
  loading: false,
  refreshMessages: async (roomId: string, lastMessage: Message) => {},
  isRefreshing: true,
})

export default messageContext

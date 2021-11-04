import { createContext } from 'react'
import { User } from '../../Interfaces/Responses'
export interface Message {
  content: string
  username: string
  image?: string
}

interface globalContext {
  messages: Message[]
  sendMessage: Function
  users: User[]
  loading?: boolean
}

const messageContext = createContext<globalContext>({
  messages: [],
  sendMessage: (message: Message) => {},
  users: [],
  loading: false,
})

export default messageContext

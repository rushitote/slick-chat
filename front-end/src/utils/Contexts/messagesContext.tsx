import { createContext } from 'react'
import { User } from '../../ResponseInterfaces/Interfaces'
export interface Message {
  content: string
  username: string
  image?: string
}

interface globalContext {
  messages: Message[]
  sendMessage: Function
  users: User[]
}

const messageContext = createContext<globalContext>({
  messages: [],
  sendMessage: (message: Message) => {},
  users: [],
})

export default messageContext

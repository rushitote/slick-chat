import { createContext } from 'react'

export interface Message {
  content: string
  username: string
  image?: string
}

interface globalContext {
  messages: Message[]
  sendMessage: Function
  users: string[]
}

const messageContext = createContext<globalContext>({
  messages: [],
  sendMessage: (message: Message) => {},
  users: [],
})

export default messageContext

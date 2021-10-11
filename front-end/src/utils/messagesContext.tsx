import { createContext } from 'react'

export interface Message {
  text: string
  username: string
  image?: string
}

interface globalContext {
  sent: Message[]
  received: Message[]
  sendMessage: Function
  users: string[]
}

const messageContext = createContext<globalContext>({
  sent: [],
  received: [],
  sendMessage: (message: Message) => {},
  users: [],
})

export default messageContext

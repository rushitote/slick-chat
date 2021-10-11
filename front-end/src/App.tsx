import './App.css'
import ChatWindow from './components/Chat/ChatWindow'
import messageContext, { Message } from './utils/messagesContext'
import UsersList from './components/LeftPane/Users/UsersList'

import { useState } from 'react'
import avatar from './images/avatar.png'
export interface IAppProps {}

export default function App(props: IAppProps) {
  const [sentMessages, setSentMessages] = useState([])
  const [receivedMessages, setReceivedMessages] = useState([
    {
      text: 'Hello World',
      username: 'Shashwat',
      image: avatar,
    },
    {
      text: 'Hello World',
      username: 'Anonymous',
      image: avatar,
    },
  ])
  const [usersList, setUsersList] = useState(['Shashwat', 'Varun', 'Rushikesh'])
  const sendMessage = (message: Message) => {
    setReceivedMessages((prevState: any) => {
      return prevState.concat(message)
    })
  }
  return (
    <messageContext.Provider
      value={{
        sent: sentMessages,
        received: receivedMessages,
        sendMessage,
        users: usersList,
      }}
    >
      <UsersList image={avatar} />
      <ChatWindow />
    </messageContext.Provider>
  )
}

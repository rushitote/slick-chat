import './Group.css'
import ChatWindow from '../components/Chat/ChatWindow'
import messageContext, { Message } from '../utils/messagesContext'
import UsersList from '../components/LeftPane/Users/UsersList'
import { Route, useParams } from 'react-router-dom'
import { useState } from 'react'
import avatar from '../images/avatar.png'
import { io } from 'socket.io-client'
const socket = io('localhost:3000')
export interface Group {
  id: string
}
export interface IAppProps {}

export default function App(props: IAppProps) {
  const params = useParams<Group>()
  console.log(params.id)
  const [sentMessages, setSentMessages] = useState([])
  const [receivedMessages, setReceivedMessages] = useState([
    {
      content: 'Hello World',
      username: 'Shashwat',
      image: avatar,
    },
    {
      content: 'Hello World',
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
    <Route path="/group/:id">
      <messageContext.Provider
        value={{
          sent: sentMessages,
          received: receivedMessages,
          sendMessage,
          users: usersList,
        }}
      >
        <UsersList image={avatar} socket={socket} groupId={params.id} />
        <ChatWindow />
      </messageContext.Provider>
    </Route>
  )
}

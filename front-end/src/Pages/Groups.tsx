import './Group.css'
import ChatWindow from '../components/Chat/ChatWindow'
import messageContext, { Message } from '../utils/messagesContext'
import UsersList from '../components/LeftPane/Users/UsersList'
import { Route, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import avatar from '../images/avatar.png'
import { io, Socket } from 'socket.io-client'
import socketContext from '../utils/socketContext'

export interface Group {
  id: string
}
export interface IAppProps {}

export default function App(props: IAppProps) {
  const [socket, setSocket] = useState<Socket>()
  const params = useParams<Group>()
  const [sentMessages, setSentMessages] = useState([])
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([])
  const [usersList, setUsersList] = useState(['Shashwat', 'Varun', 'Rushikesh'])
  const sendMessage = (message: Message) => {
    setReceivedMessages((prevState: any) => {
      return prevState.concat(message)
    })
  }
  useEffect(() => {
    const newSocket = io('http://localhost:3000', { transports: ['websocket'] })
    setSocket(newSocket)
    newSocket?.connect()
    newSocket?.emit(
      'joinRoom',
      JSON.stringify({
        roomId: params.id,
      })
    )
    newSocket.on('newMessage', (data: Message) => {
      setReceivedMessages(
        receivedMessages.concat({
          image: avatar,
          username: data.username,
          content: data.content,
        })
      )
    })

    return () => {
      newSocket.close()
    }
  }, [params.id, receivedMessages])
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
        <socketContext.Provider value={{ socket, roomId: params.id }}>
          <UsersList image={avatar} />
          <ChatWindow />
        </socketContext.Provider>
      </messageContext.Provider>
    </Route>
  )
}
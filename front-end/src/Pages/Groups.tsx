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
  const [messages, setMessages] = useState<Message[]>([])
  const [usersList, setUsersList] = useState(['Shashwat', 'Varun', 'Rushikesh'])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const sendMessage = (message: Message) => {
    setMessages((prevState: any) => {
      return prevState.concat(message)
    })
  }
  useEffect(() => {
    const isAuthenticated = async () => {
      const response = await fetch('http://localhost:3000/authenticated', {
        method: 'GET',
        credentials: 'include', //includes the cookies
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
      const { authenticated } = await response.json()
      // response is of format { authenticated: true|false}
      setIsAuthenticated(authenticated)
    }
    isAuthenticated()
  }, [params.id])
  useEffect(() => {
    if (!isAuthenticated) {
      // no need to run any of the following code
      return
    }
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
      setMessages(
        messages.concat({
          image: avatar,
          username: data.username,
          content: data.content,
        })
      )
    })

    return () => {
      newSocket.close()
    }
  }, [params.id, messages, isAuthenticated])
  return isAuthenticated ? (
    <Route path="/group/:id">
      <messageContext.Provider
        value={{
          messages,
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
  ) : (
    <h1 id="error-heading">Not authenticated</h1>
  )
}

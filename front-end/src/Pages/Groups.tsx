import styles from './Group.module.css'
import ChatWindow from '../components/Chat/ChatWindow'
import globalContext, { Message } from '../utils/Contexts/messagesContext'
import UsersList from '../components/LeftPane/Users/UsersList'
import { Route, useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import avatar from '../images/avatar.png'
import { io, Socket } from 'socket.io-client'
import socketContext from '../utils/Contexts/socketContext'
import loggedInContext from '../utils/Contexts/loggedInContext'

export interface Group {
  id: string
}
export interface IAppProps {}

export default function App(props: IAppProps) {
  const [socket, setSocket] = useState<Socket>()
  const params = useParams<Group>()
  const [messages, setMessages] = useState<Message[]>([])
  const [usersList, setUsersList] = useState(['Shashwat', 'Varun', 'Rushikesh'])
  const { isLoggedIn: isAuthenticated } = useContext(loggedInContext)
  const sendMessage = (message: Message) => {
    setMessages((prevState: any) => {
      return prevState.concat(message)
    })
  }
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
  if (isAuthenticated !== undefined) {
    return isAuthenticated ? (
      <globalContext.Provider
        value={{
          messages,
          sendMessage,
          users: usersList,
        }}
      >
        <socketContext.Provider value={{ socket, roomId: params.id }}>
          <div id={styles['root']}>
            <UsersList image={avatar} />
            <ChatWindow />
          </div>
        </socketContext.Provider>
      </globalContext.Provider>
    ) : (
      <h1>Not authenticated</h1>
    )
  } else {
    return <div>Loading Website</div>
  }
}

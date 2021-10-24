import styles from './Group.module.css'
import ChatWindow from '../components/Chat/ChatWindow'
import globalContext, { Message } from '../utils/Contexts/messagesContext'
import UsersList from '../components/LeftPane/Users/UsersList'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import avatar from '../images/avatar.png'
import { io, Socket } from 'socket.io-client'
import socketContext from '../utils/Contexts/socketContext'
import loggedInContext from '../utils/Contexts/loggedInContext'
import axios from 'axios'
import User from '../Interfaces/UserResponse'
import ErrorPage from '../components/UI/Error'
export interface Group {
  id: string
}
export interface IAppProps {}

export default function Groups(props: IAppProps) {
  const [socket, setSocket] = useState<Socket>()
  const params = useParams<Group>()
  const [messages, setMessages] = useState<Message[]>([])
  const [usersList, setUsersList] = useState<User[] | undefined>(undefined)
  const { isLoggedIn: isAuthenticated } = useContext(loggedInContext)

  const getUsersInRoom = (id: string) => {
    let users: User[] = []
  }

  const sendMessage = (message: Message) => {
    setMessages((prevState: any) => {
      return prevState.concat(message)
    })
  }
  useEffect(() => {
    const asyncWrapper = async (id: string) => {
      const response = await axios.get('http://localhost:3000/rooms/get', {
        params: {
          roomId: id,
        },
        withCredentials: true,
      })
      const users = (response.data as any).users
      console.log(users)
      setUsersList(users)
      if (!isAuthenticated) {
        return
      } else if (users.length === 0) {
        console.log('Room not found')
      } else {
        const newSocket = io('http://localhost:3000', {
          transports: ['websocket'],
        })
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
      }
    }
    asyncWrapper(params.id)
  }, [params.id, messages, isAuthenticated])
  if (isAuthenticated !== undefined) {
    if (isAuthenticated && usersList !== undefined && usersList.length !== 0) {
      return (
        <globalContext.Provider
          value={{
            messages,
            sendMessage,
            users: usersList!,
          }}
        >
          <socketContext.Provider value={{ socket, roomId: params.id }}>
            <div id={styles['root']}>
              <UsersList image={avatar} />
              <ChatWindow />
            </div>
          </socketContext.Provider>
        </globalContext.Provider>
      )
    } else if (!isAuthenticated) {
      return (
        <ErrorPage
          title='Not logged in'
          message='You need to login to join rooms'
          recommend='You can login by going'
          link='/login'
        />
      )
    } else if (usersList === undefined) {
      return null
    } else {
      return (
        <ErrorPage
          title='Room not found'
          message="The room you are trying to access doesn't exist"
          recommend='You can go back to the homepage'
          link='/'
        />
      )
    }
  } else if (usersList === undefined) {
    return null
  } else if (usersList.length === 0) {
    return (
      <ErrorPage
        title='Room not found'
        message="The room you are trying to access doesn't exist"
        recommend='You can go back to the homepage'
        link='/'
      />
    )
  } else {
    // this means authentication is in process
    // do nothing
    return null
  }
}

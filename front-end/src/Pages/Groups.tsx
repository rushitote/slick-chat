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

const getUsersInRoom = (id: string) => {
  let users: User[] = []
  const asyncWrapper = async () => {
    axios
      .get('http://localhost:3000/rooms/get', {
        params: {
          roomId: id,
        },
        withCredentials: true,
      })
      .then((response) => {
        // probably should use an interface here
        users = (response.data as any).users
      })
      .catch((e) => {
        console.log(e)
      })
  }
  asyncWrapper()
  return users
}

export default function Groups(props: IAppProps) {
  const [socket, setSocket] = useState<Socket>()
  const params = useParams<Group>()
  const [messages, setMessages] = useState<Message[]>([])
  const [usersList, setUsersList] = useState<User[]>([])
  const { isLoggedIn: isAuthenticated } = useContext(loggedInContext)
  const sendMessage = (message: Message) => {
    setMessages((prevState: any) => {
      return prevState.concat(message)
    })
  }
  useEffect(() => {
    let users = getUsersInRoom(params.id)
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
  }, [params.id, messages, isAuthenticated])
  if (isAuthenticated !== undefined) {
    if (isAuthenticated) {
      return (
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
      )
    } else {
      return (
        <ErrorPage
          title="Not logged in"
          message="You need to login to join rooms"
          recommend="You can login by going"
          link="/login"
        />
      )
    }
  } else if (usersList.length === 0) {
    return (
      <ErrorPage
        title="Room not found"
        message="The room you are trying to access doesn't exist"
        recommend="You can go back to the homepage"
        link="/"
      />
    )
  } else {
    // this means authentication is in process
    // do nothing
    return null
  }
}

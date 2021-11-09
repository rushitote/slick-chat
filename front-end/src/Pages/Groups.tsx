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
import { User } from '../Interfaces/Responses'
import ErrorPage from '../components/UI/Error'
import Authenticated from '../components/Other/Authenticated'
import { getMessages } from '../utils/Rooms'
export interface Group {
  id: string
}
export interface IAppProps {}

export default function Groups(props: IAppProps) {
  const [socket, setSocket] = useState<Socket>()
  const params = useParams<Group>()
  const [messages, setMessages] = useState<Message[]>([])
  const [usersList, setUsersList] = useState<User[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const { isLoggedIn } = useContext(loggedInContext)

  const sendMessage = (message: Message) => {
    // setMessages((prevState: any) => {
    //   console.log('previous state is', prevState)
    //   console.log('new state is', message)
    //   return prevState.concat(message)
    // })
  }
  useEffect(() => {
    console.log('called')
    const asyncWrapper = async (id: string) => {
      const response = await axios.get('http://localhost:3000/rooms/get', {
        params: {
          roomId: id,
        },
        withCredentials: true,
      })
      const users: User[] = (response.data as any).users
      console.log(users)
      setUsersList(users)

      if (users.length !== 0) {
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
          console.log('hello messaging')
          setMessages((m) =>
            m.concat({
              image: avatar,
              ...data,
            })
          )
        })
        const msg = await getMessages(params.id)
        setMessages(msg.reverse())
        setIsLoading(false)
        return () => {
          newSocket.close()
        }
      }
    }
    if (isLoggedIn) asyncWrapper(params.id)
  }, [params.id, isLoggedIn])

  return (
    <Authenticated>
      {usersList !== undefined && usersList.length !== 0 ? (
        <globalContext.Provider
          value={{
            messages,
            sendMessage,
            users: usersList!,
            loading: isLoading,
          }}
        >
          <socketContext.Provider value={{ socket, roomId: params.id }}>
            <div id={styles['root']}>
              <UsersList image={avatar} />
              <ChatWindow />
            </div>
          </socketContext.Provider>
        </globalContext.Provider>
      ) : usersList !== undefined ? (
        <ErrorPage
          title='Room not found'
          message="The room you are trying to access doesn't exist"
          recommend='You can go back to the homepage'
          link='/'
        />
      ) : null}
    </Authenticated>
  )
}

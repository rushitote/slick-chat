import styles from './Group.module.css'
import ChatWindow from '../components/Chat/ChatWindow'
import globalContext, { Message } from '../utils/Contexts/messagesContext'
import UsersList from '../components/LeftPane/Users/UsersList'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext, useCallback } from 'react'
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
  const [moreMessages, setMoreMessages] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // isLoading is for the initial page load
  // isRefreshing is for when the user scrolls up and requests past messages

  const { isLoggedIn } = useContext(loggedInContext)
  const sendMessage = (message: Message) => {
    // setMessages((prevState: any) => {
    //   return prevState.concat(message)
    // })
  }
  const refreshMessages = useCallback(
    async (lastMessage?: Message) => {
      if (moreMessages) {
        setIsRefreshing(true)
        const newMessages = (await getMessages(params.id, lastMessage)).reverse()
        if (newMessages.length < 25) {
          setMoreMessages(false)
        }
        if (newMessages.length !== 0 && newMessages[0].messageId !== lastMessage?.messageId) {
          setMessages((m) => newMessages.concat(m))
        }
        setIsRefreshing(false)
      }
    },
    [params.id, moreMessages]
  )

  useEffect(() => {
    const asyncWrapper = async (id: string) => {
      const response = await axios.get('http://localhost:3000/rooms/get', {
        params: {
          roomId: id,
        },
        withCredentials: true,
      })
      const users: User[] = (response.data as any).users
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
          setMessages((m) =>
            m.concat({
              image: avatar,
              ...data,
            })
          )
        })
        await refreshMessages()
        setIsLoading(false)
        return () => {
          newSocket.close()
        }
      }
    }
    if (isLoggedIn) asyncWrapper(params.id)
  }, [params.id, isLoggedIn, refreshMessages])

  return (
    <Authenticated>
      {usersList !== undefined && usersList.length !== 0 ? (
        <globalContext.Provider
          value={{
            messages,
            sendMessage,
            users: usersList!,
            loading: isLoading,
            refreshMessages,
            isRefreshing,
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

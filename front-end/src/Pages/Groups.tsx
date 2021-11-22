import styles from './Group.module.css'
import ChatWindow from '../components/Chat/ChatWindow'
import globalContext, { Message } from '../utils/Contexts/messagesContext'
import LeftPane from '../components/LeftPane/Users/LeftPane'
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
import { ToastContainer } from 'react-toastify'
import toast from '../components/UI/Toast'
import 'react-toastify/dist/ReactToastify.css'

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
    async (lastMessage: Message) => {
      if (moreMessages) {
        setIsRefreshing(true)
        const newMessages = (await getMessages(params.id, lastMessage)).reverse()

        if (newMessages.length < 25) {
          setMoreMessages(false)
        }
        if (newMessages?.length !== 0 && newMessages[0].messageId !== lastMessage?.messageId) {
          if (document.getElementById(newMessages[0].messageId) === null) {
            setMessages((m) => newMessages.concat(m))
          }
        }
        setIsRefreshing(false)
      }
    },
    [params.id, moreMessages]
  )

  const loadInitialMessages = useCallback(async () => {
    setIsLoading(true)
    setMessages((await getMessages(params.id)).reverse())
    setIsLoading(false)
  }, [params.id])

  const addUserToUsersList = useCallback(async (user: User) => {
    setUsersList((prevState: any) => {
      return [...prevState, user]
    })
    toast(`🦄 ${user.username} joined the room!`)
  }, [])

  const removeUserFromUsersList = useCallback(async (user: User) => {
    setUsersList((prevState: any) => {
      return prevState.filter((u: User) => u.userId !== user.userId)
    })
    toast(`👋 ${user.username} left the room`)
  }, [])

  useEffect(() => {
    let newSocket: Socket

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
        newSocket = io('http://localhost:3000', {
          transports: ['websocket'],
        })
        console.log('new socket connection')
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
        newSocket.on('userJoinRoom', (user: User) => {
          console.log('user joined room', user)
          addUserToUsersList(user)
        })
        newSocket.on('userLeaveRoom', (user: User) => {
          console.log('user left room', user)
          removeUserFromUsersList(user)
        })
        await loadInitialMessages()
        setIsLoading(false)
      }
    }
    if (isLoggedIn) asyncWrapper(params.id)
    return () => {
      // closes socket before a new connection is established
      newSocket?.close()
    }
  }, [params.id, isLoggedIn, loadInitialMessages, addUserToUsersList, removeUserFromUsersList])

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
              <LeftPane image={avatar} roomId={params.id} />
              <ChatWindow />
              <ToastContainer toastStyle={{ backgroundColor: 'black', color: 'white' }} />
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

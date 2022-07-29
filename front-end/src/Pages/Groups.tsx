import styles from './Group.module.css'
import ChatWindow from '../components/Chat/ChatWindow'
import globalContext, { Message } from '../utils/Contexts/messagesContext'
import LeftPane from '../components/LeftPane/Users/LeftPane'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import avatar from '../images/avatar.png'
import { Socket } from 'socket.io-client'
import socketContext from '../utils/Contexts/socketContext'
import { User } from '../Interfaces/Responses'
import { getMessages, roomExists } from '../utils/Rooms'
import { ToastContainer } from 'react-toastify'
import connectSocket from '../socket/socket'
import ErrorPage from '../components/UI/Error'
import fetchMessages from '../utils/Messages'
import ShowInvite from '../components/Other/ShowInvite'
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
  const [roomFound, setRoomFound] = useState<boolean | undefined>(undefined)
  const [inRoom, setInRoom] = useState(false)

  // if user is not in room, they're shown a page asking if they want to join

  // isLoading is for the initial page load
  // isRefreshing is for when the user scrolls up and requests past messages

  const refreshMessages = async (lastMessage: Message) => {
    setIsRefreshing(true)
    await fetchMessages(moreMessages, params.id, lastMessage, setMoreMessages, setMessages)
    setIsRefreshing(false)
  }

  const loadInitialMessages = useCallback(async () => {
    setIsLoading(true)
    setMessages((await getMessages(params.id)).reverse())
    setIsLoading(false)
  }, [params.id])

  const onRoomJoin = async (username: string, userId: string) => {
    setInRoom(true)
    const newSocket = await connectSocket(params.id, setMessages, setUsersList, loadInitialMessages)
    setSocket(newSocket)
    setUsersList((users) => {
      return users?.concat({ username, userId, online: true })
    })
  }

  useEffect(() => {
    let newSocket: Socket
    const asyncWrapper = async (id: string) => {
      try {
        const { users, exists, userInRoom } = await roomExists(id)
        setUsersList(users)
        setRoomFound(exists)
        setInRoom(userInRoom)
        // if users length is 0 that means the room doesn't exist
        if (exists && userInRoom) {
          newSocket = await connectSocket(params.id, setMessages, setUsersList, loadInitialMessages)
          setSocket(newSocket)
          setIsLoading(false)
        }
      } catch (e: any) {
        // if the user doesn't belong to this room
        // the get requests throws a 401
        if (e.response.status === 401) {
        }
      }
    }
    asyncWrapper(params.id)
    return () => {
      // closes socket before a new connection is established
      newSocket?.close()
    }
  }, [params.id, loadInitialMessages])

  if (roomFound === undefined) {
    // page is loading
    return null
  } else if (!roomFound) {
    return (
      <ErrorPage
        title='Room not found'
        message="The room you are trying to access doesn't exist"
        recommend='You can go back to the homepage'
        link='/'
      />
    )
  } else if (!inRoom) {
    return (
      <ShowInvite
        roomName='appetizing-many-microphone'
        roomId={params.id}
        onJoin={onRoomJoin}
        loadMessages={loadInitialMessages}
      />
    )
  } else {
    return (
      <globalContext.Provider
        value={{
          messages,
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
    )
  }
}

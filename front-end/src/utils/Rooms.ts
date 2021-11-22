import axios from 'axios'
import { User } from '../Interfaces/Responses'
import { Message } from './Contexts/messagesContext'
const isValidRoom = (roomId: string): boolean => {
  const validRoomRegex = /^[A-Za-z0-9]{7}$/
  return validRoomRegex.test(roomId)
}

const roomExists = async (roomId: string) => {
  const { users, userInRoom } = await getUsersOfRoom(roomId)
  return { exists: users.length !== 0, users, userInRoom }
}

const getUsersOfRoom = async (roomId: string) => {
  try {
    const response = await axios.get('http://localhost:3000/rooms/get', {
      params: {
        roomId,
      },
      withCredentials: true,
    })
    const users: User[] = (response.data as any).users as User[]
    const userInRoom = (response.data as any).userInRoom as boolean
    return { users, userInRoom }
  } catch (e) {
    throw new Error('Cannot get users of room')
  }
}
const addToRoom = async (roomId: string) => {
  try {
    await axios.post(
      'http://localhost:3000/rooms/add',
      { roomId },
      {
        withCredentials: true,
      }
    )
  } catch (e: any) {
    throw new Error(e.response.msg)
  }
}

const removeFromRoom = async (roomId: string) => {
  try {
    const response = await axios.post('http://localhost:3000/rooms/remove', { roomId }, { withCredentials: true })
    if (response.status === 200) {
      return true
    }
  } catch (e: any) {
    throw new Error(e.response.msg)
  }
  return false
}

const getMessages = async (roomId: string, lastMessage?: Message) => {
  try {
    const response = await axios.get<any, any>('http://localhost:3000/messages/get', {
      params: {
        roomId,
        messageId: lastMessage?.messageId,
      },
      withCredentials: true,
    })
    return response.data.messages as Message[]
  } catch (e: any) {
    throw new Error(e.response.msg)
  }
}
export { isValidRoom, roomExists, addToRoom, removeFromRoom, getMessages, getUsersOfRoom }

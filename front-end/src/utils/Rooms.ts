import axios from 'axios'
import { Room, User } from '../Interfaces/Responses'
import { Message } from './Contexts/messagesContext'
const isValidRoom = (roomId: string): boolean => {
  const validRoomRegex = /^[A-Za-z0-9]{7}$/
  return validRoomRegex.test(roomId)
}

const roomExists = async (roomId: string) => {
  const { users, ...rest } = await getRoomInfo(roomId)
  return { exists: users.length !== 0, users, ...rest }
}

const getRoomInfo = async (roomID: string) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/rooms/info`, {
      params: {
        roomID,
      },
      withCredentials: true,
    })
    const roomName: string = (response.data as any).roomName as string
    const roomOwner: User = (response.data as any).roomOwner as User
    const users: User[] = (response.data as any).users as User[]
    const userInRoom = (response.data as any).userInRoom as boolean

    return { roomName, roomOwner, users, userInRoom }
  } catch (e) {
    throw new Error('Cannot get room info')
  }
}
const getUserRooms = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/users/info`, {
      withCredentials: true,
    })
    const rooms: Room[] = (response.data as any).rooms as Room[]
    return rooms
  } catch (e) {
    throw new Error("Cannot get user's info")
  }
}
const addToRoom = async (roomId: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/rooms/add`,
      { roomId },
      {
        withCredentials: true,
      }
    )
    const { username, userId } = response.data as User
    return { username, userId }
  } catch (e: any) {
    throw new Error(e.response.msg)
  }
}

const removeFromRoom = async (roomId: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/rooms/remove`,
      { roomId },
      { withCredentials: true }
    )
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
    const response = await axios.get<any, any>(`${process.env.REACT_APP_HOST}/messages/get`, {
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

const generateInviteLink = (roomId: string) => {
  return `${window.location.protocol}//${window.location.host}/group/${roomId}`
}

export {
  isValidRoom,
  roomExists,
  addToRoom,
  removeFromRoom,
  getMessages,
  getUserRooms,
  generateInviteLink,
}

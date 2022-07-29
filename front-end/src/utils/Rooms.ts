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
    const response = await axios.get(`${process.env.REACT_APP_HOST}/rooms/get`, {
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
const getRoomInfo=async(roomID:string)=>{
  try{
    const response=await axios.get(`${process.env.REACT_APP_HOST}/rooms/info`,{
      params:{
        roomID,
      },
      withCredentials:true,
    })
    const roomName:string=(response.data as any).roomName as string
    const roomOwnerId:string=(response.data as any).roomOwnerId as string
    const roomOwnerUsername:string=(response.data as any).roomOwnerUsername as string
    return {roomName,roomOwnerId,roomOwnerUsername}
  }
  catch(e){
    throw new Error("Cannot get room info")
  }
}
const getUserDetails=async(userID:string)=>{
  try{
    let params={userID}
    const response=await axios.get(`${process.env.REACT_APP_HOST}/users/info`,{
      params,
      withCredentials:true
    })
    const username:string=(response.data as any).username as string
    return {username}
  }
  catch(e){
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
export { isValidRoom, roomExists, addToRoom, removeFromRoom, getMessages, getUsersOfRoom,getRoomInfo,getUserDetails }

import Rooms from '../models/rooms'
import Users from '../models/users'
import { getUserNameOfUser } from '../ops/users'
import { customAlphabet } from 'nanoid'
import { getUsersOfRoom } from './mappingUserToRoom'
import { onlineUsers } from '../../index'
export async function createRoom(userId: string, roomName: string) {
  const user = await Users.findOne({ where: { userId } })
  if (!user) return

  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const nanoid = customAlphabet(alphabet, 7)
  const roomId = nanoid()

  await Rooms.create({
    roomName: roomName,
    roomId: roomId,
    createdByUserId: userId,
  })

  return roomId
}

export async function getRoomDetails(roomId: string, currUser) {
  const room = await Rooms.findOne({ where: { roomId } })
  if (!room) return

  const groupOnlineUsers = onlineUsers?.get(roomId)

  // adds online status to each user
  const users = (await getUsersOfRoom(roomId)).map(user => {
    return { ...user, online: groupOnlineUsers?.has(user.username) ?? false }
  })

  const userInRoom = users.map(user => user.userId).includes(currUser.userId)
  const roomOwner = users.filter(user => user.userId === room.get('createdByUserId'))[0]

  return {
    roomId,
    roomName: room.get('roomName'),
    roomOwner,
    users,
    userInRoom,
  }
}

export async function checkIfRoomExists(roomId: string) {
  const room = await Rooms.findOne({ where: { roomId: roomId } })

  return room ? true : false
}

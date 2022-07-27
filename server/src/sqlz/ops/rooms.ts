import Rooms from '../models/rooms'
import Users from '../models/users'
import { getUserNameOfUser } from '../ops/users'
import { customAlphabet } from 'nanoid'
import { getUsersOfRoom } from './mappingUserToRoom'

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

export async function getRoomDetails(roomId: string) {
  const room = await Rooms.findOne({ where: { roomId } })
  if (!room) return

  return {
    roomId,
    roomName: room.get('roomName'),
    roomOwnerId: room.get('createdByUserId'),
    roomOwnerUsername: await getUserNameOfUser(room.get('createdByUserId')),
    users: await getUsersOfRoom(roomId),
  }
}

export async function checkIfRoomExists(roomId: string) {
  const room = await Rooms.findOne({ where: { roomId: roomId } })

  return room ? true : false
}

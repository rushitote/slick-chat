import Rooms from '../models/rooms'
import Users from '../models/users'
import { customAlphabet } from 'nanoid'

export async function createRoom(username: string, roomName: string) {
  const user: any = await Users.findOne({ where: { username: username } })

  const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const nanoid = customAlphabet(alphabet, 7)
  const roomId = nanoid()

  await Rooms.create({
    roomName: roomName,
    roomId: roomId,
    createdByUserId: user.userId,
  })

  return roomId
}

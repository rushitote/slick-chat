const { Op } = require('sequelize')
import Users from '../models/users'
import Rooms from '../models/rooms'
import mappingUserToRoom from '../models/mappingUserToRoom'
import { socket } from '../../index'

export async function checkUserInRoom(username, roomId): Promise<boolean> {
  const user = await Users.findOne({ where: { username: username } })
  if (!user) {
    return false
  }

  const userId = user.userId

  const found = await mappingUserToRoom.findOne({ where: { roomId, userId } })
  return found ? true : false
}

export async function addUserRoomMapping(username: string, roomId: string): Promise<boolean> {
  const user = await Users.findOne({ where: { username: username } })
  if (!user) return

  const userId = user.userId

  const found = await mappingUserToRoom.findOne({ where: { roomId, userId } })
  if (!found) {
    socket.io.to(roomId).emit('userJoinRoom', { username, userId })
    await mappingUserToRoom.create({ roomId, userId })
    return true
  }
  return false
}

export async function getRoomsOfUser(username: string) {
  const user = await Users.findOne({ where: { username: username } })
  if (!user) {
    return []
  }

  const userId = user.userId

  const mappingsOfUser = await mappingUserToRoom.findAll({ where: { userId } })
  const roomIdsOfUser = []
  mappingsOfUser.map(mapping => {
    roomIdsOfUser.push({ roomId: mapping.roomId })
  })

  const roomsOfUser = (await Rooms.findAll({ where: { [Op.or]: roomIdsOfUser } })).map(roomInfo => {
    return {
      roomId: roomInfo.roomId,
      roomName: roomInfo.roomName,
    }
  })

  return roomsOfUser
}

export async function getUsersOfRoom(roomId: string) {
  const userIdList = (await mappingUserToRoom.findAll({ where: { roomId: roomId } })).map(mapping => {
    return { userId: mapping.userId }
  })

  if (userIdList.length != 0) {
    const userList = (await Users.findAll({ where: { [Op.or]: userIdList } })).map(user => {
      return {
        userId: user.userId,
        username: user.username,
      }
    })
    return userList
  } else {
    return []
  }
}

export async function removeUserRoomMapping(username: string, roomId: string): Promise<boolean> {
  const user = await Users.findOne({ where: { username: username } })
  const userId = user.userId

  const found = await mappingUserToRoom.findOne({ where: { roomId, userId } })
  const isRoomCreator = await Rooms.findOne({ where: { roomId, createdByUserId: userId } })

  if (found && !isRoomCreator) {
    socket.io.to(roomId).emit('userLeaveRoom', { username, userId })
    await mappingUserToRoom.destroy({ where: { roomId, userId } })
    return true
  }
  return false
}

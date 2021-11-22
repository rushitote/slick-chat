const { Op } = require('sequelize')
import Users from '../models/users'
import Rooms from '../models/rooms'
import mappingUserToRoom from '../models/mappingUserToRoom'
import { socket } from '../../index'

export async function checkUserInRoom(userId, roomId): Promise<boolean> {
  const found = await mappingUserToRoom.findOne({ where: { roomId, userId } })
  return found ? true : false
}

export async function addUserRoomMapping(userId: string, roomId: string): Promise<boolean> {
  const user = await Users.findOne({ where: { userId } })

  if (!user) return

  const found = await mappingUserToRoom.findOne({ where: { roomId, userId } })
  if (!found) {
    socket.io.to(roomId).emit('userJoinRoom', { username: user.username, userId })
    await mappingUserToRoom.create({ roomId, userId })
    return true
  }
  return false
}

export async function getRoomsOfUser(userId: string) {
  const user = await Users.findOne({ where: { userId } })
  if (!user) {
    return []
  }

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

export async function removeUserRoomMapping(userId: string, roomId: string): Promise<boolean> {
  const user = await Users.findOne({ where: { userId } })
  if (!user) return false

  const found = await mappingUserToRoom.findOne({ where: { roomId, userId } })
  const isRoomCreator = await Rooms.findOne({ where: { roomId, createdByUserId: userId } })

  if (found && !isRoomCreator) {
    socket.io.to(roomId).emit('userLeaveRoom', { username: user.username, userId })
    await mappingUserToRoom.destroy({ where: { roomId, userId } })
    return true
  }
  return false
}

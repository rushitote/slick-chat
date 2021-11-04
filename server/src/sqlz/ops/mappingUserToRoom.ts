const { Op } = require('sequelize')
import Users from '../models/users'
import Rooms from '../models/rooms'
import mappingUserToRoom from '../models/mappingUserToRoom'

export async function checkUserInRoom(username, roomId) {
  const user: any = await Users.findOne({ where: { username: username } })
  if (!user) {
    return false
  }

  const userId = user.userId

  const found = await mappingUserToRoom.findOne({ where: { roomId, userId } })
  return found ? true : false
}

export async function addUserRoomMapping(username: string, roomId: string) {
  const user: any = await Users.findOne({ where: { username: username } })
  if (!user) return

  const userId = user.userId

  const found = await mappingUserToRoom.findOne({ where: { roomId, userId } })
  if (!found) {
    await mappingUserToRoom.create({ roomId, userId })
  }
}

export async function getRoomsOfUser(username: string) {
  const user: any = await Users.findOne({ where: { username: username } })
  if (!user) {
    return []
  }

  const userId = user.userId

  const mappingsOfUser = await mappingUserToRoom.findAll({ where: { userId } })
  const roomIdsOfUser = []
  mappingsOfUser.map((mapping: any) => {
    roomIdsOfUser.push({ roomId: mapping.roomId })
  })

  const roomsOfUser = (
    await Rooms.findAll({ where: { [Op.or]: roomIdsOfUser } })
  ).map((roomInfo: any) => {
    return {
      roomId: roomInfo.roomId,
      roomName: roomInfo.roomName,
    }
  })

  return roomsOfUser
}

export async function getUsersOfRoom(roomId: string) {
  const userIdList = (
    await mappingUserToRoom.findAll({ where: { roomId: roomId } })
  ).map((mapping: any) => {
    return { userId: mapping.userId }
  })

  if (userIdList.length != 0) {
    const userList = (
      await Users.findAll({ where: { [Op.or]: userIdList } })
    ).map((user: any) => {
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

export async function removeUserRoomMapping(username: string, roomId: string) {
  const user: any = await Users.findOne({ where: { username: username } })
  const userId = user.userId

  await mappingUserToRoom.destroy({ where: { userId, roomId } })
}

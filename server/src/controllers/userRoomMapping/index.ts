import * as mappingOps from '../../sqlz/ops/mappingUserToRoom'
import * as roomOps from '../../sqlz/ops/rooms'
import { RequestWithUser } from '../types'
import { Request, Response } from 'express'
import { onlineUsers } from '../../index'

export function addUserRoomMapping(req: RequestWithUser, res: Response) {
  const userId = req.user.userId
  const { roomId } = req.body

  if (roomId === undefined) {
    return res.status(422).send({})
  }

  try {
    roomOps.checkIfRoomExists(roomId).then(roomExists => {
      if (roomExists) {
        mappingOps.addUserRoomMapping(userId, roomId).then(() => {
          res
            .status(200)
            .send({ msg: 'Mapping added successfully.', username: req.user.username, userId: req.user.userId })
        })
      } else {
        res.status(400).send({ msg: 'Room does not exist.' })
      }
    })
  } catch (err) {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

export function getRoomsOfUser(req: RequestWithUser, res: Response) {
  const userId = req.user.userId

  try {
    mappingOps.getRoomsOfUser(userId).then(rooms => {
      res.status(200).send({
        rooms,
      })
    })
  } catch (err) {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

export function getUsersOfRoom(req: RequestWithUser, res: Response) {
  const roomId = req.query.roomId?.toString()
  if (roomId === undefined) {
    return res.status(422).send({})
  }

  const groupOnlineUsers = onlineUsers?.get(roomId)
  try {
    mappingOps.getUsersOfRoom(roomId).then(users => {
      const userInRoom = users.map(user => user.userId).includes(req.user.userId)
      res.status(200).send({
        users: users.map(user => {
          return { ...user, online: groupOnlineUsers?.has(user.username) ?? false }
        }), // adds online status to each user
        userInRoom,
      })
    })
  } catch (err) {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

export function removeUserRoomMapping(req: RequestWithUser, res: Response) {
  const userId = req.user.userId
  const { roomId } = req.body

  if (roomId === undefined) {
    return res.status(422).send({})
  }

  try {
    mappingOps.removeUserRoomMapping(userId, roomId).then(status => {
      if (status) res.status(200).send({ msg: 'Successfully removed mapping.' })
      else res.status(400).send({})
    })
  } catch (err) {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

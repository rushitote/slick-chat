import * as mappingOps from '../../sqlz/ops/mappingUserToRoom'
import * as roomOps from '../../sqlz/ops/rooms'
import { RequestWithUser } from '../types'
import { Request, Response } from 'express'

export function addUserRoomMapping(req: RequestWithUser, res: Response) {
  const username = req.user.username
  const { roomId } = req.body

  if (roomId === undefined) {
    return res.status(422).send({})
  }

  try {
    roomOps.checkIfRoomExists(roomId).then(roomExists => {
      if (roomExists) {
        mappingOps.addUserRoomMapping(username, roomId).then(() => {
          res.status(200).send({ msg: 'Mapping added successfully.' })
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
  const username = req.user.username

  try {
    mappingOps.getRoomsOfUser(username).then(rooms => {
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

export function getUsersOfRoom(req: Request, res: Response) {
  const roomId = req.query.roomId?.toString()

  if (roomId === undefined) {
    return res.status(422).send({})
  }

  try {
    mappingOps.getUsersOfRoom(roomId).then(users => {
      res.status(200).send({ users })
    })
  } catch (err) {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

export function removeUserRoomMapping(req: RequestWithUser, res: Response) {
  const username = req.user.username
  const { roomId } = req.body

  if (roomId === undefined) {
    return res.status(422).send({})
  }

  try {
    mappingOps.removeUserRoomMapping(username, roomId).then(status => {
      if (status) res.status(200).send({ msg: 'Successfully removed mapping.' })
      else res.status(400).send({})
    })
  } catch (err) {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

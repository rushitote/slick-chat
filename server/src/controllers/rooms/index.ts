import * as roomOps from '../../sqlz/ops/rooms'
import * as mappingOps from '../../sqlz/ops/mappingUserToRoom'
import { RequestWithUser } from '../types'
import { Request, Response } from 'express'

export function createRoom(req: RequestWithUser, res: Response) {
  const userId = req.user.userId
  const { roomName } = req.body

  if (roomName === undefined) {
    return res.status(422).send({})
  }

  try {
    roomOps.createRoom(userId, roomName).then(roomId => {
      mappingOps.addUserRoomMapping(userId, roomId)
      res.status(200).send({
        msg: 'Room successfully created.',
        roomId: roomId,
      })
    })
  } catch (err) {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

import * as roomOps from '../../sqlz/ops/rooms'
import * as mappingOps from '../../sqlz/ops/mappingUserToRoom'
import { RequestWithUser, RoomInfoRequest } from '../types'
import { Response } from 'express'

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

export async function getRoomInfo(req: RoomInfoRequest, res: Response) {
  const roomID = req.query.roomID

  if (!roomID) {
    return res.status(400).send({ msg: 'RoomID should not be empty' })
  }

  try {
    const roomInfo = await roomOps.getRoomDetails(roomID, req.user)
    if (roomInfo) {
      res.status(200).send(roomInfo)
    } else {
      res.status(400).send({ msg: 'invalid RoomID' })
    }
  } catch (err) {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

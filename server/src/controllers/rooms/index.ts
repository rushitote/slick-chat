import * as roomOps from '../../sqlz/ops/rooms'
import * as mappingOps from '../../sqlz/ops/mappingUserToRoom'
import { Request, Response } from 'express'

export function createRoom(req: Request, res: Response) {
  const username = (req.user as any).username
  const { roomName } = req.body

  if (roomName === undefined) {
    return res.status(422).send({})
  }

  try {
    roomOps.createRoom(username, roomName).then(roomId => {
      mappingOps.addUserRoomMapping(username, roomId)
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

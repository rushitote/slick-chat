import * as roomOps from '../../sqlz/ops/rooms'
import { Request, Response } from 'express'

export function createRoom(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorised user')
  }
  const username = (req.user as any).username
  const { roomName } = req.body
  try {
    roomOps.createRoom(username, roomName).then((roomId) => {
      res.status(200).send({
        message: 'Room successfully created.',
        roomId: roomId
      })
    })
  } catch (err) {
    res.status(500)
  }
}


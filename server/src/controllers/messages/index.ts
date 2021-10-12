import * as messageOps from '../../sqlz/ops/messages'
import * as mappingOps from '../../sqlz/ops/mappingUserToRoom'
import { Request, Response } from 'express'

export function postMessage(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorised user')
  }

  const username = (req.user as any).username
  const { roomId, content } = req.body

  try {
    messageOps.postMessage(username, content, roomId).then(messageId => {
      res.status(200).send({
        messageId: messageId,
      })
    })
  } catch (err) {
    res.status(500)
  }
}

export function getMessages(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorised user')
  }

  const username = (req.user as any).username
  const { roomId } = req.body
  try {
    mappingOps.addUserRoomMapping(username, roomId)
    messageOps.getMessages(roomId).then(messages => {
      res.status(200).send(messages)
    })
  } catch (err) {
    res.status(500)
  }
}

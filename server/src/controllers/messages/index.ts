import * as messageOps from '../../sqlz/ops/messages'
import * as mappingOps from '../../sqlz/ops/mappingUserToRoom'
import { Request, Response } from 'express'

export function postMessage(req: Request, res: Response) {
  const username = (req.user as any).username
  const { roomId, content } = req.body

  if (roomId === undefined || content === undefined) {
    return res.status(422).send()
  }

  try {
    messageOps.postMessage(username, content, roomId).then(messageId => {
      res.status(200).send({
        messageId: messageId,
      })
    })
  } catch (err) {
    res.status(500).send()
  }
}

export function getMessages(req: Request, res: Response) {
  const username = (req.user as any).username
  const roomId = req.query.roomId?.toString()

  if (roomId === undefined) {
    return res.status(422).send()
  }

  try {
    mappingOps.addUserRoomMapping(username, roomId)
    messageOps.getMessages(roomId).then(messages => {
      res.status(200).send({ messages })
    })
  } catch (err) {
    res.status(500).send()
  }
}

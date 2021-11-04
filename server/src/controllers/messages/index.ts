import * as messageOps from '../../sqlz/ops/messages'
import * as mappingOps from '../../sqlz/ops/mappingUserToRoom'
import { Request, Response } from 'express'

export function postMessage(req: Request, res: Response) {
  const username = (req.user as any).username
  const { roomId, content } = req.body

  if (roomId === undefined || content === undefined) {
    return res.status(422).send({})
  }

  try {
    mappingOps.checkUserInRoom(username, roomId).then(isInRoom => {
      if (isInRoom) {
        messageOps.postMessage(username, content, roomId).then(messageId => {
          res.status(200).send({
            messageId: messageId,
          })
        })
      } else {
        res.status(403).send({
          msg: 'User is not in room',
        })
      }
    })
  } catch (err) {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

export function getMessages(req: Request, res: Response) {
  const username = (req.user as any).username
  const roomId = req.query.roomId?.toString()
  const messageId = req.query.messageId?.toString()

  if (roomId === undefined) {
    return res.status(422).send({})
  }

  try {
    mappingOps.checkUserInRoom(username, roomId).then(isInRoom => {
      if (!isInRoom) {
        return res.status(403).send({
          msg: 'User is not in room',
        })
      } else {
        messageOps.getMessages(roomId, messageId).then(messages => {
          res.status(200).send({ messages })
        })
      }
    })
  } catch (err) {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

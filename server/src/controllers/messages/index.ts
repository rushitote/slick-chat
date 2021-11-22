import * as messageOps from '../../sqlz/ops/messages'
import * as mappingOps from '../../sqlz/ops/mappingUserToRoom'
import { RequestWithUser } from '../types'
import { Request, Response } from 'express'

export function postMessage(req: RequestWithUser, res: Response) {
  const userId = req.user.userId
  const { roomId, content } = req.body

  if (roomId === undefined || content === undefined) {
    return res.status(422).send({})
  }

  try {
    mappingOps.checkUserInRoom(userId, roomId).then(isInRoom => {
      if (isInRoom) {
        messageOps.postMessage(userId, content, roomId).then(message => {
          res.status(200).send({
            messageId: message.messageId,
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

export function getMessages(req: RequestWithUser, res: Response) {
  const userId = req.user.userId
  const roomId = req.query.roomId?.toString()
  const messageId = req.query.messageId?.toString()

  if (roomId === undefined) {
    return res.status(422).send({})
  }

  try {
    mappingOps.checkUserInRoom(userId, roomId).then(isInRoom => {
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

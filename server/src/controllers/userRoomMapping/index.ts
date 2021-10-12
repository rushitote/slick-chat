import * as mappingOps from '../../sqlz/ops/mappingUserToRoom'
import { Request, Response } from 'express'
import users from 'sqlz/models/users'

export function addUserRoomMapping(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorised user')
  }

  const username = (req.user as any).username
  const { roomId } = req.body

  try {
    mappingOps.addUserRoomMapping(username, roomId).then(() => {
      res.status(200)
    })
  } catch (err) {
    res.status(500)
  }
}

export function getRoomsOfUser(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorised user')
  }

  const username = (req.user as any).username

  try {
    mappingOps.getRoomsOfUser(username).then(rooms => {
      res.status(200).send({
        rooms,
      })
    })
  } catch (err) {
    res.status(500)
  }
}

export function getUsersOfRoom(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorised user')
  }

  const { roomId } = req.body

  try {
    mappingOps.getUsersOfRoom(roomId).then(users => {
      res.status(200).send({ users })
    })
  } catch (err) {
    res.status(500)
  }
}

export function removeUserRoomMapping(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorised user')
  }

  const username = (req.user as any).username
  const { roomId } = req.body

  try {
    mappingOps.removeUserRoomMapping(username, roomId).then(() => {
      res.status(200)
    })
  } catch (err) {
    res.status(500)
  }
}

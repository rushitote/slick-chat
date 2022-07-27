import { UserDetailsRequest } from '../types'
import { getUser } from '../../sqlz/ops/users'
import { Response } from 'express'

export async function getUserDetails(req: UserDetailsRequest, res: Response) {
  const userDetails = await getUser(req.query.userID)
  if (userDetails) {
    res.status(200).send(userDetails)
  } else {
    res.status(500).send({
      msg: 'Internal server error',
    })
  }
}

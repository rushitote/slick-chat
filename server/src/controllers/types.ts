import { Request } from 'express'

export interface RequestWithUser extends Request {
  user: {
    username: string
    password: string
    userId: string
  }
}

export interface RoomInfoRequest extends Request {
  query: {
    roomID: string
  }
}

export interface UserDetailsRequest extends Request {
  query: {
    userID: string
  }
}

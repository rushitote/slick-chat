import { IncomingMessage } from 'http'

export type socketRequest = IncomingMessage & {
  user: {
    dataValues: {
      username: string
    }
  }
  session: {
    passport: {
      user: string
    }
  }
}

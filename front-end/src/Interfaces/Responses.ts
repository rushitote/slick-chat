import { AxiosResponse } from 'axios'

export interface User {
  username: String
  userId: String
  online: boolean
}

export interface RoomCreateResponse extends AxiosResponse {
  data: {
    username: string
    roomId: string
  }
}

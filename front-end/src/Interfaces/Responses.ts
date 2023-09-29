import { AxiosResponse } from 'axios'

export interface User {
  username: String
  userId: String
  online: boolean
  typing: boolean
}
export interface Room {
  roomId: string
  roomName: string
}
export interface RoomCreateResponse extends AxiosResponse {
  data: {
    username: string
    roomId: string
  }
}

import * as messageOps from '../sqlz/ops/messages'
import * as mappingOps from '../sqlz/ops/mappingUserToRoom'
import * as roomOps from '../sqlz/ops/rooms'
import { socketRequest } from './types'
import { MessageAttributes } from '../sqlz/models/messages'

export async function postMessage(request: socketRequest, username, content, roomId): Promise<MessageAttributes> {
  let message: MessageAttributes = null
  const isInRoom = await mappingOps.checkUserInRoom(username, roomId)
  if (isInRoom) {
    message = await messageOps.postMessageByUserId(request.session.passport.user, content, roomId)
  }
  return message
}

export async function joinRoom(username, roomId): Promise<boolean> {
  try {
    const roomExists = await roomOps.checkIfRoomExists(roomId)
    if (!roomExists) {
      const hasJoined = await mappingOps.addUserRoomMapping(username, roomId)
      return hasJoined
    }
    return false
  } catch (err) {
    return false
  }
}

export async function leaveRoom(username, roomId): Promise<boolean> {
  try {
    const hasRemoved = await mappingOps.removeUserRoomMapping(username, roomId)
    return hasRemoved
  } catch (err) {
    return false
  }
}

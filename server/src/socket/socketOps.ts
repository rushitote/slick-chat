import * as messageOps from '../sqlz/ops/messages'
import * as mappingOps from '../sqlz/ops/mappingUserToRoom'
import * as roomOps from '../sqlz/ops/rooms'
import { socketRequest } from './types'
import { MessageAttributes } from '../sqlz/models/messages'

export async function postMessage(request: socketRequest, username, content, roomId): Promise<MessageAttributes> {
  let message: MessageAttributes = null
  const isInRoom = await mappingOps.checkUserInRoom(request.session.passport.user, roomId)
  if (isInRoom) {
    message = await messageOps.postMessageByUserId(request.session.passport.user, content, roomId)
  }
  return message
}

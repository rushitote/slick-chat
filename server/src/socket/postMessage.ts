import * as messageOps from '../sqlz/ops/messages'
import * as mappingOps from '../sqlz/ops/mappingUserToRoom'
import { socketRequest } from './types'
import { MessageAttributes } from '../sqlz/models/messages'

export default async function postMessage(
  request: socketRequest,
  username,
  content,
  roomId
): Promise<MessageAttributes> {
  let message: MessageAttributes = null
  const isInRoom = await mappingOps.checkUserInRoom(username, roomId)
  if (isInRoom) {
    message = await messageOps.postMessageByUserId(request.session.passport.user, content, roomId)
  }
  return message
}

import * as messageOps from '../sqlz/ops/messages'
import * as mappingOps from '../sqlz/ops/mappingUserToRoom'
import { socketRequest } from './types'

export default async function postMessage(request: socketRequest, username, content, roomId) {
  let messageId = null
  const isInRoom = await mappingOps.checkUserInRoom(username, roomId)
  if (isInRoom) {
    messageId = await messageOps.postMessageByUserId(request.session.passport.user, content, roomId)
  }
  return messageId
}

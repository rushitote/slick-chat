import * as messageOps from '../sqlz/ops/messages'
import * as mappingOps from '../sqlz/ops/mappingUserToRoom'
import { socketRequest } from './types'

export default async function postMessage(request: socketRequest, username, content, roomId) {
  let messageId = null
  mappingOps.checkUserInRoom(username, roomId).then(isInRoom => {
    if(isInRoom){
      messageId = messageOps.postMessageByUserId(request.session.passport.user, content, roomId)
    }
  })
  return messageId
}

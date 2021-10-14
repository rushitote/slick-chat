import * as messageOps from '../sqlz/ops/messages'

export default function postMessage(request, content, roomId) {
  return messageOps.postMessageByUserId(request.session.passport.user, content, roomId)
}

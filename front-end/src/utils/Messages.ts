import { Message } from './Contexts/messagesContext'
import { getMessages } from '../utils/Rooms'

const fetchMessages = async (
  moreMessages: boolean,
  roomId: string,
  lastMessage: Message,
  setMoreMessages: Function,
  setMessages: Function
) => {
  if (!moreMessages) return
  const newMessages = (await getMessages(roomId, lastMessage)).reverse()

  if (newMessages.length < 25) {
    setMoreMessages(false)
  }
  if (newMessages?.length !== 0 && newMessages[0].messageId !== lastMessage?.messageId) {
    if (document.getElementById(newMessages[0].messageId) === null) {
      setMessages((m: Message) => newMessages.concat(m))
    }
  }
}

export default fetchMessages

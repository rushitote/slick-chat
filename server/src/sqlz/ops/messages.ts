import Users from '../models/users'
import Messages from '../models/messages'
import { nanoid } from 'nanoid'

export async function getMessages(roomId) {
  const messages = await Messages.findAll({
    where: { roomId: roomId },
    limit: 10,
  })
  return messages
}

export async function postMessage(username, content, roomId) {
  const user: any = await Users.findOne({ where: { username: username } })
  const userId = user.userId
  const messageId = nanoid()

  await Messages.create({ messageId, content, userId, roomId })

  return messageId
}

export async function postMessageByUserId(userId, content, roomId) {
  const messageId = nanoid()
  await Messages.create({ messageId, content, userId, roomId })
  return messageId
}

import Users from '../models/users'
import Messages from '../models/messages'
import { nanoid } from 'nanoid'
import { QueryTypes } from 'sequelize'
import sequelize from '../../sqlz/models'
import { MessageAttributes } from '../models/messages'
export async function getMessages(roomId, messageId) {
  if (messageId === undefined) {
    const messages = await sequelize.query(
      'select * from "Messages" m, "Users" u where ("roomId" = ? and m."userId" = u."userId") order by "unixTime" limit 25',
      { replacements: [roomId], type: QueryTypes.SELECT }
    )

    return messages
  } else {
    const messages = await sequelize.query(
      'select * from "Messages" m2 where m2."unixTime" < \
      (select "unixTime" from "Messages" m where m."messageId" = ? ) and "roomId" = ? \
      order by "unixTime" desc limit 25',
      { replacements: [messageId, roomId], type: QueryTypes.SELECT }
    )

    return messages
  }
}

export async function postMessage(username, content, roomId): Promise<MessageAttributes> {
  const user = await Users.findOne({ where: { username: username } })
  const userId = user.userId
  const messageId = nanoid()
  const unixTime = Date.now()

  await Messages.create({ messageId, content, userId, roomId, unixTime })

  return { messageId, content, userId, roomId, unixTime }
}

export async function postMessageByUserId(userId, content, roomId): Promise<MessageAttributes> {
  const messageId = nanoid()
  const unixTime = Date.now()
  await Messages.create({ messageId, content, userId, roomId, unixTime })
  return { messageId, content, userId, roomId, unixTime }
}

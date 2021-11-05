import { STRING, TEXT, BIGINT, Optional, Model } from 'sequelize'
import sequelize from './index'

interface MessageAttributes {
  messageId: string
  content: string
  userId: string
  roomId: string
  unixTime: number
}

interface MessageCreationAttributes
  extends Optional<MessageAttributes, 'messageId'> {}

interface MessageInstance
  extends Model<MessageAttributes, MessageCreationAttributes>,
    MessageAttributes {}

const Messages = sequelize.define<MessageInstance>(
  'Messages',
  {
    messageId: {
      type: STRING,
      primaryKey: true,
    },
    content: {
      type: TEXT,
    },
    userId: {
      type: STRING,
    },
    roomId: {
      type: STRING,
    },
    unixTime: {
      type: BIGINT,
    },
  },
  {
    tableName: 'Messages',
  }
)

Messages.sync()

export default Messages

import { STRING, TEXT, BIGINT } from 'sequelize'
import sequelize from './index'

const Messages = sequelize.define(
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

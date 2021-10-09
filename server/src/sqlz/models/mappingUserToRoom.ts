import { STRING } from 'sequelize'
import sequelize from './index'

const mappingUserToRoom = sequelize.define(
  'mappingUserToRoom',
  {
    roomId: {
      type: STRING,
      allowNull: false,
    },
    userId: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'mappingUserToRoom',
  }
)

mappingUserToRoom.sync()

export default mappingUserToRoom

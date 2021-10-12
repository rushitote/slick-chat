import { STRING } from 'sequelize'
import sequelize from './index'

const Rooms = sequelize.define(
  'Rooms',
  {
    roomId: {
      type: STRING,
      primaryKey: true,
    },
    roomName: {
      type: STRING,
    },
    createdByUserId: {
      type: STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Rooms',
  }
)

Rooms.sync()

export default Rooms

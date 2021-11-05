import { STRING, Optional, Model } from 'sequelize'
import sequelize from './index'

interface RoomAttributes {
  roomId: string
  roomName: string
  createdByUserId: string
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'roomId'> {}

interface RoomInstance
  extends Model<RoomAttributes, RoomCreationAttributes>,
    RoomAttributes {}

const Rooms = sequelize.define<RoomInstance>(
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
      allowNull: false,
    },
  },
  {
    tableName: 'Rooms',
  }
)

Rooms.sync()

export default Rooms

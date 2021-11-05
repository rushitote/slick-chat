import { STRING, Model, Optional } from 'sequelize'
import sequelize from './index'

interface UserRoomAttributes {
  userId: string
  roomId: string
}

interface UserRoomCreationAttributes
  extends Optional<UserRoomAttributes, 'userId' | 'roomId'> {}

interface UserRoomInstance
  extends Model<UserRoomAttributes, UserRoomCreationAttributes>,
    UserRoomAttributes {}

const mappingUserToRoom = sequelize.define<UserRoomInstance>(
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

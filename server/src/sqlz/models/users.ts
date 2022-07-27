import { STRING, Optional, Model } from 'sequelize'
import sequelize from './index'

interface UserAttributes {
  userId: string
  username: string
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const Users = sequelize.define<UserInstance>(
  'Users',
  {
    userId: {
      type: STRING,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Users',
  }
)

Users.sync()

export default Users

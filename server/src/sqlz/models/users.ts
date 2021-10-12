import { STRING } from 'sequelize'
import sequelize from './index'

const Users = sequelize.define(
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

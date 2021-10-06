import { Model, STRING } from 'sequelize'
import sequelize from './index'

const Users = sequelize.define(
  'Users',
  {
    // Model attributes are defined here
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
    // Other model options go here
  }
)

Users.sync()

export default Users

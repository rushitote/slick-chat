import { Sequelize } from 'sequelize'

import config = require('../config/config.json')

const dbConfig = config['development']
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: 'localhost',
  dialect: 'postgres',
})

export default sequelize

'use strict'

const Sequelize = require('sequelize')
const { environment } = require('./constant')

const sequelize = new Sequelize(
  environment.databaseName,
  environment.databaseUserName,
  environment.databasePassword,
  {
    host: environment.databaseHost,
    port: environment.databasePort,
    dialect: environment.databaseClient,
    timezone: '+05:30',
    charset: 'utf8',
    define: {
      underscored: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false,
  }
)



sequelize
  .authenticate()
  .then(() => {
    require('./dbrelation');
  })
  .catch((err) => {
    console.log('DB CONNECTION ERROR--')
  });

  
module.exports = sequelize;

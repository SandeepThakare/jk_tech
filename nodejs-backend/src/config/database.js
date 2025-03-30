const { Sequelize } = require('sequelize');
const { config } = require('./config');

const sequelize = new Sequelize(config.database.url, {
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize; 
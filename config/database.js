require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME || 'vendor_mgmt_db', process.env.DB_USER || 'root', process.env.DB_PASS || 'root0930@', {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: false
});
module.exports = sequelize;


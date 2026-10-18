const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Document = sequelize.define('Document', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, unique: true },
  docType: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  filePath: { type: DataTypes.STRING },
  originalFilename: { type: DataTypes.STRING },
  remark: { type: DataTypes.TEXT },
  uploadedBy: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'documents', timestamps: true });

module.exports = Document;

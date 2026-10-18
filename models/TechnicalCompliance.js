const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TechnicalComplianceDoc = sequelize.define('TechnicalComplianceDoc', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  docName: { type: DataTypes.STRING, allowNull: false },
  frequency: { type: DataTypes.ENUM('yes', 'no', 'only_1_time'), allowNull: false, defaultValue: 'yes' },
  remarks: { type: DataTypes.TEXT },
  filePath: { type: DataTypes.STRING },
  originalFilename: { type: DataTypes.STRING },
  uploadedBy: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'technical_compliance_docs', timestamps: true });

module.exports = TechnicalComplianceDoc;

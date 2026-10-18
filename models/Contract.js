const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contract = sequelize.define('Contract', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, unique: true },
  projectId: { type: DataTypes.INTEGER, allowNull: true },
  contractName: { type: DataTypes.STRING, allowNull: false },
  contractNo: { type: DataTypes.STRING, allowNull: true },
  poNo: { type: DataTypes.STRING, allowNull: true },
  contractType: { type: DataTypes.STRING },
  siteInCharge: { type: DataTypes.STRING },
  bgValue: { type: DataTypes.DECIMAL(15, 2) },
  validity: { type: DataTypes.STRING },
  performanceMetric: { type: DataTypes.STRING },
  effectiveDate: { type: DataTypes.DATEONLY },
  endDate: { type: DataTypes.DATEONLY },
  contractValueYearWise: { type: DataTypes.TEXT },
  invoicingFrequency: { type: DataTypes.STRING },
  scopeSummary: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'contracts', timestamps: true });

module.exports = Contract;

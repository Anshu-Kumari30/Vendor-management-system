const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, unique: true },
  tenderNo: { type: DataTypes.STRING, allowNull: false },
  stationName: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  solarCapacityMW: { type: DataTypes.DECIMAL(10, 2) },
  bessCapacityMW: { type: DataTypes.DECIMAL(10, 2) },
  bessCapacityMWh: { type: DataTypes.DECIMAL(10, 2) },
  projectType: { type: DataTypes.STRING },
  commissioningDate: { type: DataTypes.DATEONLY },
  performanceMetric: { type: DataTypes.STRING },
  guaranteedParameter: { type: DataTypes.STRING },
  ppaTariff: { type: DataTypes.DECIMAL(10, 4) },
  guaranteedMUs: { type: DataTypes.DECIMAL(15, 2) },
  offTaker: { type: DataTypes.STRING },
  ppaTenure: { type: DataTypes.INTEGER },
  mustRun: { type: DataTypes.BOOLEAN, defaultValue: false },
  projectCost: { type: DataTypes.DECIMAL(15, 2) },
  oaDate: { type: DataTypes.DATEONLY },
  dsmApplications: { type: DataTypes.TEXT },
  degradationFactor: { type: DataTypes.DECIMAL(5, 2) },
  projectContractor: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'projects', timestamps: true });

module.exports = Project;

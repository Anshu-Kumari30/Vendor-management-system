const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SubVendorCompliance = sequelize.define('SubVendorCompliance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorId: { type: DataTypes.INTEGER },
  subVendorName: { type: DataTypes.STRING },
  complianceStatus: { type: DataTypes.STRING },
  remarks: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'sub_vendor_compliance', timestamps: true });

const PBGInsurance = sequelize.define('PBGInsurance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorId: { type: DataTypes.INTEGER },
  pbgStatus: { type: DataTypes.STRING },
  insuranceStatus: { type: DataTypes.STRING },
  validity: { type: DataTypes.STRING },
  remarks: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'pbg_insurance', timestamps: true });

const ContractFile = sequelize.define('ContractFile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorId: { type: DataTypes.INTEGER },
  fileName: { type: DataTypes.STRING },
  filePath: { type: DataTypes.STRING },
  remarks: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'contract_files', timestamps: true });

const Correspondence = sequelize.define('Correspondence', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorId: { type: DataTypes.INTEGER },
  subject: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATEONLY },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'correspondence', timestamps: true });

const ProjectTab = sequelize.define('ProjectTab', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorId: { type: DataTypes.INTEGER },
  projectName: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  remarks: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'project_tabs', timestamps: true });

module.exports = { SubVendorCompliance, PBGInsurance, ContractFile, Correspondence, ProjectTab };

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VendorDetail = sequelize.define('VendorDetail', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorId: { type: DataTypes.INTEGER },
  companyName: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  contactPerson: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  gstNo: { type: DataTypes.STRING },
  panNo: { type: DataTypes.STRING },
  bankDetails: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'vendor_details', timestamps: true });

const TechnicalCompliance = sequelize.define('TechnicalCompliance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorId: { type: DataTypes.INTEGER },
  isoCertified: { type: DataTypes.BOOLEAN, defaultValue: false },
  qualityRating: { type: DataTypes.STRING },
  auditStatus: { type: DataTypes.STRING },
  remarks: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'technical_compliance', timestamps: true });

const HRIR = sequelize.define('HRIR', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorId: { type: DataTypes.INTEGER },
  employeeCount: { type: DataTypes.INTEGER },
  laborCompliance: { type: DataTypes.BOOLEAN, defaultValue: false },
  insuranceStatus: { type: DataTypes.STRING },
  remarks: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'hr_ir', timestamps: true });

const Invoice = sequelize.define('Invoice', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorId: { type: DataTypes.INTEGER },
  invoiceNo: { type: DataTypes.STRING },
  amount: { type: DataTypes.DECIMAL(15, 2) },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected', 'paid'), defaultValue: 'pending' },
  date: { type: DataTypes.DATEONLY },
  remarks: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'invoices', timestamps: true });

const MeetingMinute = sequelize.define('MeetingMinute', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendorId: { type: DataTypes.INTEGER },
  meetingDate: { type: DataTypes.DATEONLY },
  agenda: { type: DataTypes.TEXT },
  minutes: { type: DataTypes.TEXT },
  actionItems: { type: DataTypes.TEXT },
  actionTrackerStatus: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'meeting_minutes', timestamps: true });

module.exports = { VendorDetail, TechnicalCompliance, HRIR, Invoice, MeetingMinute };

const ExcelJS = require('exceljs');
const fs = require('fs');

async function exportUsersToExcel(users, filePath) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Users');
  sheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Role', key: 'role', width: 15 },
    { header: 'Active', key: 'isActive', width: 10 }
  ];
  users.forEach(u => sheet.addRow({ id: u.id, name: u.name, email: u.email, role: u.role, isActive: u.isActive ? 'Yes' : 'No' }));
  await workbook.xlsx.writeFile(filePath);
}

module.exports = { exportUsersToExcel };

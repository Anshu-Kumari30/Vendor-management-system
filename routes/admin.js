const express = require('express');
const User = require('../models/User');
const Project = require('../models/Project');
const Contract = require('../models/Contract');
const Document = require('../models/Document');
const { verify_token, requireRole } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/users', verify_token, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'uuid', 'name', 'email', 'role', 'isActive', 'createdAt'] });
    res.json(users);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/users', verify_token, requireRole('admin'), async (req, res) => {
  try {
    const { username, email, password, role, uuid } = req.body;
    const bcrypt = require('bcrypt');
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ uuid: uuid || undefined, name: username, email, password: hashed, role: role || 'vendor' });
    res.status(201).json({ message: 'User created', user: { id: user.id, uuid: user.uuid, name: user.name, email: user.email, role: user.role } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/users/:id/role', verify_token, requireRole('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    const allowed = ['vendor', 'reviewer', 'approver', 'hod', 'admin'];
    if (!allowed.includes(role)) return res.status(400).json({ error: 'Invalid role' });
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.role = role;
    await user.save();
    res.json({ message: 'Role updated', user: { id: user.id, name: user.name, role: user.role } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/users/:id/status', verify_token, requireRole('admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.isActive = req.body.isActive;
    await user.save();
    res.json({ message: 'Status updated', user: { id: user.id, isActive: user.isActive } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/projects', verify_token, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ message: 'Project created', tenderNo: project.tenderNo, uuid: project.uuid, project });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/projects', verify_token, async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/contracts', verify_token, async (req, res) => {
  try {
    const contract = await Contract.create(req.body);
    res.status(201).json({ message: 'Contract created', contractNo: contract.contractNo, poNo: contract.poNo, uuid: contract.uuid, contract });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/contracts', verify_token, async (req, res) => {
  try {
    const contracts = await Contract.findAll();
    res.json(contracts);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/documents', verify_token, upload.single('file'), async (req, res) => {
  try {
    const doc = await Document.create({
      uuid: req.body.uuid || undefined,
      docType: req.body.docType,
      title: req.body.title,
      filePath: req.file ? req.file.path : null,
      originalFilename: req.file ? req.file.originalname : null,
      remark: req.body.remark,
      uploadedBy: req.user ? req.user.name || req.user.email : 'admin'
    });
    res.status(201).json({ message: 'Document uploaded', uuid: doc.uuid, doc });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/documents', verify_token, async (req, res) => {
  try {
    const docs = await Document.findAll();
    res.json(docs);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/documents/:id', verify_token, requireRole('admin'), async (req, res) => {
  try {
    const doc = await Document.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    await doc.destroy();
    res.json({ message: 'Document deleted' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;

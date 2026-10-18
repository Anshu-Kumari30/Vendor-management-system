const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const sequelize = require('./config/database');
require('./models/User');
require('./models/Project');
require('./models/Contract');
require('./models/Document');
require('./models/TechnicalCompliance');
require('./models/CheckerTabs');
require('./models/VendorTabs');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000", "http://localhost:3001"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      formAction: ["'self'", "javascript:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"]
    }
  }
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { error: 'Too many requests' } });
app.use('/api/', limiter);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Role-based dashboard endpoints
app.get('/api/dashboard', require('./middleware/auth').verify_token, (req, res) => {
  const role = req.user.role;
  const tabs = {
    vendor: ['Vendor Details', 'Technical Compliance', 'HR / IR', 'Invoices', 'Meeting Minutes & Action Tracker'],
    reviewer: ['Needs Attention', 'Contracts', 'Technical Review', 'HR / IR Clearance', 'Sub-vendor Compliance', 'Meeting Minutes & Actions', 'Invoice Ledger', 'PBG & Insurance', 'Contract File', 'Correspondence', 'Projects'],
    approver: ['Needs Attention', 'Contracts', 'Technical Review', 'HR / IR Clearance', 'Sub-vendor Compliance', 'Meeting Minutes & Actions', 'Invoice Ledger', 'PBG & Insurance', 'Contract File', 'Correspondence', 'Projects'],
    hod: ['Needs Attention', 'Contracts', 'Technical Review', 'HR / IR Clearance', 'Sub-vendor Compliance', 'Meeting Minutes & Actions', 'Invoice Ledger', 'PBG & Insurance', 'Contract File', 'Correspondence', 'Projects'],
    admin: ['Users', 'Projects', 'Contracts', 'Documents', 'System Overview']
  };
  res.json({ role, tabs: tabs[role] || [], user: { name: req.user.name, email: req.user.email } });
});

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', theme: 'warm-editorial' }));

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signup.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/add-project', (req, res) => res.sendFile(path.join(__dirname, 'public', 'add-project.html')));
app.get('/add-contract', (req, res) => res.sendFile(path.join(__dirname, 'public', 'add-contract.html')));
app.get('/add-document', (req, res) => res.sendFile(path.join(__dirname, 'public', 'add-document.html')));
app.get('/technical-compliance', (req, res) => res.sendFile(path.join(__dirname, 'public', 'technical-compliance.html')));
app.get('/hr-ir-clearance', (req, res) => res.sendFile(path.join(__dirname, 'public', 'hr-ir-clearance.html')));

sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});


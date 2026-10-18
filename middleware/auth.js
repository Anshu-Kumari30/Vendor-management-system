const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'vendor-system-secret-key-2026';

function verify_token(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Invalid token format' });

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid or expired token' });
    try {
      const user = await User.findByPk(decoded.id);
      if (!user || !user.isActive) return res.status(401).json({ error: 'User not found or inactive' });
      req.user = user;
      next();
    } catch (e) {
      res.status(500).json({ error: 'Server error during authentication' });
    }
  });
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: insufficient role' });
    }
    next();
  };
}

module.exports = { verify_token, requireRole, JWT_SECRET };

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../db/database');

const JWT_SECRET = process.env.JWT_SECRET || 'edunova_jwt_secret_2026_very_long_key';

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success:false, message:'Email and password required' });
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND is_active = 1').get(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ success:false, message:'Invalid credentials' });
  }
  db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);
  const token = jwt.sign({ id:user.id, email:user.email, role:user.role, name:user.full_name }, JWT_SECRET, { expiresIn:'24h' });
  res.json({ success:true, token, user:{ id:user.id, email:user.email, role:user.role, name:user.full_name, avatar_seed:user.avatar_seed } });
});

// GET /api/auth/me
router.get('/me', require('../middleware/auth').auth, (req, res) => {
  const db = getDb();
  const user = db.prepare('SELECT id,email,role,full_name,avatar_seed,last_login,created_at FROM users WHERE id=?').get(req.user.id);
  res.json({ success:true, data:user });
});

module.exports = router;

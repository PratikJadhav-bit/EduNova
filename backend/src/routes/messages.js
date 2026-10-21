const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');
const { auth } = require('../middleware/auth');
router.get('/', auth, (req, res) => {
  const db = getDb();
  const msgs = db.prepare('SELECT m.*, u.full_name as from_name, u.avatar_seed as from_avatar FROM messages m JOIN users u ON u.id=m.from_user WHERE m.to_user=? ORDER BY m.sent_at DESC LIMIT 50').all(req.user.id);
  res.json({ success:true, data:msgs });
});
router.post('/', auth, (req, res) => {
  const db = getDb();
  const { to_user, body, subject, student_id } = req.body;
  if (!to_user||!body) return res.status(400).json({success:false,message:'to_user and body required'});
  const r = db.prepare('INSERT INTO messages (from_user,to_user,body,subject,student_id) VALUES (?,?,?,?,?)').run(req.user.id,to_user,body,subject||null,student_id||null);
  res.status(201).json({ success:true, data:{id:r.lastInsertRowid} });
});
router.put('/:id/read', auth, (req, res) => {
  const db = getDb();
  db.prepare('UPDATE messages SET is_read=1 WHERE id=? AND to_user=?').run(req.params.id, req.user.id);
  res.json({ success:true });
});
module.exports = router;

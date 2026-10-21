const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');
const { auth } = require('../middleware/auth');
router.get('/', auth, (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM teachers WHERE is_active=1 ORDER BY rating DESC').all();
  res.json({ success:true, data:rows });
});
router.get('/:id', auth, (req, res) => {
  const db = getDb();
  const teacher = db.prepare('SELECT * FROM teachers WHERE id=?').get(req.params.id);
  if (!teacher) return res.status(404).json({success:false,message:'Teacher not found'});
  res.json({ success:true, data:teacher });
});
router.post('/', auth, (req, res) => {
  const db = getDb();
  const {employee_id,full_name,email,subject,specialization,qualification,experience_yrs} = req.body;
  if (!employee_id||!full_name||!email||!subject) return res.status(400).json({success:false,message:'Required fields missing'});
  const r = db.prepare('INSERT INTO teachers (employee_id,full_name,email,subject,specialization,qualification,experience_yrs,avatar_seed) VALUES (?,?,?,?,?,?,?,?)').run(employee_id,full_name,email,subject,specialization||null,qualification||null,experience_yrs||0,full_name.split(' ')[0].toLowerCase());
  res.status(201).json({ success:true, data:{id:r.lastInsertRowid} });
});
module.exports = router;

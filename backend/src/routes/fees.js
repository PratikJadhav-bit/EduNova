const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');
const { auth } = require('../middleware/auth');

router.get('/', auth, (req, res) => {
  const db = getDb();
  const { student_id, status, page=1, limit=20 } = req.query;
  const offset=(page-1)*limit;
  let where='WHERE 1=1'; const p=[];
  if(student_id){where+=' AND f.student_id=?';p.push(student_id);}
  if(status){where+=' AND f.status=?';p.push(status);}
  const rows = db.prepare(`
    SELECT f.*, s.full_name, s.roll_number, b.name as batch_name
    FROM fees f JOIN students s ON s.id=f.student_id JOIN batches b ON b.id=s.batch_id
    ${where} ORDER BY f.created_at DESC LIMIT ? OFFSET ?
  `).all(...p,limit,offset);
  const summary = db.prepare(`
    SELECT status, COUNT(*) as count, SUM(amount) as total FROM fees f ${where} GROUP BY status
  `).all(...p);
  res.json({ success:true, data:rows, summary });
});

router.post('/', auth, (req, res) => {
  const db = getDb();
  const {student_id,amount,fee_type,payment_method,due_date,status,notes} = req.body;
  if(!student_id||!amount||!fee_type) return res.status(400).json({success:false,message:'Required fields missing'});
  const r = db.prepare(`INSERT INTO fees (student_id,amount,fee_type,payment_method,due_date,paid_date,status,notes,recorded_by) VALUES (?,?,?,?,?,?,?,?,?)`)
    .run(student_id,amount,fee_type,payment_method||null,due_date||null,status==='Paid'?new Date().toISOString().split('T')[0]:null,status||'Pending',notes||null,req.user.id);
  res.status(201).json({ success:true, message:'Fee recorded', data:{id:r.lastInsertRowid} });
});

router.get('/dashboard', auth, (req, res) => {
  const db = getDb();
  const summary = db.prepare(`SELECT SUM(CASE WHEN status='Paid' THEN amount ELSE 0 END) as collected, SUM(CASE WHEN status='Pending' THEN amount ELSE 0 END) as pending, SUM(CASE WHEN status='Overdue' THEN amount ELSE 0 END) as overdue, COUNT(DISTINCT CASE WHEN status!='Paid' THEN student_id END) as students_pending FROM fees`).get();
  const monthly = db.prepare(`SELECT strftime('%Y-%m',created_at) as month, SUM(CASE WHEN status='Paid' THEN amount ELSE 0 END) as revenue FROM fees GROUP BY month ORDER BY month DESC LIMIT 6`).all();
  res.json({ success:true, data:{ summary, monthly } });
});

module.exports = router;

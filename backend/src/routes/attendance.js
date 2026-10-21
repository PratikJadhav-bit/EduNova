const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');
const { auth } = require('../middleware/auth');

// GET /api/attendance?batch_id=&date=
router.get('/', auth, (req, res) => {
  const db = getDb();
  const { batch_id, date = new Date().toISOString().split('T')[0] } = req.query;
  let where = 'WHERE a.date = ?';
  const params = [date];
  if (batch_id) { where += ' AND s.batch_id = ?'; params.push(batch_id); }
  const rows = db.prepare(`
    SELECT s.id as student_id, s.full_name, s.roll_number, s.avatar_seed, b.name as batch_name,
      COALESCE(a.status,'Not Marked') as status, a.notes
    FROM students s
    LEFT JOIN batches b ON b.id = s.batch_id
    LEFT JOIN attendance a ON a.student_id = s.id AND a.date = ?
    WHERE s.status = 'Active' ${batch_id ? 'AND s.batch_id = ?' : ''}
    ORDER BY s.full_name
  `).all(date, ...(batch_id ? [batch_id] : []));
  res.json({ success:true, data:rows, date });
});

// POST /api/attendance/bulk
router.post('/bulk', auth, (req, res) => {
  const db = getDb();
  const { date, records } = req.body;
  if (!date || !records?.length) return res.status(400).json({success:false,message:'date and records required'});
  const upsert = db.prepare(`INSERT INTO attendance (student_id,batch_id,date,status) VALUES (?,?,?,?) ON CONFLICT(student_id,date) DO UPDATE SET status=excluded.status`);
  const batchInsert = db.transaction((recs) => { for (const r of recs) upsert.run(r.student_id, r.batch_id, date, r.status); });
  batchInsert(records);
  res.json({ success:true, message:`Attendance saved for ${records.length} students` });
});

// GET /api/attendance/stats?batch_id=&days=30
router.get('/stats', auth, (req, res) => {
  const db = getDb();
  const { batch_id, days=30 } = req.query;
  const rows = db.prepare(`
    SELECT date,
      ROUND(100.0*SUM(CASE WHEN status IN ('Present','Late') THEN 1 ELSE 0 END)/COUNT(*),1) as pct
    FROM attendance a JOIN students s ON s.id=a.student_id
    WHERE a.date >= date('now',?) ${batch_id?'AND s.batch_id=?':''}
    GROUP BY a.date ORDER BY a.date
  `).all(`-${days} days`, ...(batch_id?[batch_id]:[])) ;
  res.json({ success:true, data:rows });
});

module.exports = router;

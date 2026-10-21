const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');
const { auth } = require('../middleware/auth');

// GET /api/students — paginated, searchable, filterable
router.get('/', auth, (req, res) => {
  const db = getDb();
  const { page=1, limit=20, search='', batch_id='', status='' } = req.query;
  const offset = (page-1)*limit;
  let where = 'WHERE 1=1';
  const params = [];
  if (search) { where += ' AND (s.full_name LIKE ? OR s.roll_number LIKE ? OR s.email LIKE ?)'; params.push(`%${search}%`,`%${search}%`,`%${search}%`); }
  if (batch_id) { where += ' AND s.batch_id = ?'; params.push(batch_id); }
  if (status) { where += ' AND s.status = ?'; params.push(status); }

  const countRow = db.prepare(`SELECT COUNT(*) as total FROM students s ${where}`).get(...params);
  const rows = db.prepare(`
    SELECT s.*, b.name as batch_name, b.stream,
      ROUND(100.0 * COUNT(CASE WHEN a.status IN ('Present','Late') THEN 1 END) / NULLIF(COUNT(a.id),0),1) as attendance_pct,
      ROUND(AVG(tr.percentage),1) as avg_score
    FROM students s
    LEFT JOIN batches b ON s.batch_id = b.id
    LEFT JOIN attendance a ON a.student_id = s.id
    LEFT JOIN test_results tr ON tr.student_id = s.id
    ${where}
    GROUP BY s.id
    ORDER BY s.full_name
    LIMIT ? OFFSET ?
  `).all(...params, limit, offset);

  res.json({
    success:true,
    data: rows,
    meta: { total:countRow.total, page:parseInt(page), limit:parseInt(limit), pages:Math.ceil(countRow.total/limit) }
  });
});

// GET /api/students/:id
router.get('/:id', auth, (req, res) => {
  const db = getDb();
  const student = db.prepare(`
    SELECT s.*, b.name as batch_name, b.stream, b.room,
      ROUND(100.0*COUNT(CASE WHEN a.status IN ('Present','Late') THEN 1 END)/NULLIF(COUNT(a.id),0),1) as attendance_pct,
      ROUND(AVG(tr.percentage),1) as avg_score,
      COUNT(DISTINCT tr.test_id) as tests_taken
    FROM students s
    LEFT JOIN batches b ON s.batch_id=b.id
    LEFT JOIN attendance a ON a.student_id=s.id
    LEFT JOIN test_results tr ON tr.student_id=s.id
    WHERE s.id=? GROUP BY s.id
  `).get(req.params.id);
  if (!student) return res.status(404).json({ success:false, message:'Student not found' });

  const recentTests = db.prepare(`
    SELECT t.title, t.subject, t.test_date, t.total_marks, tr.marks_obtained, tr.percentage, tr.rank_in_batch
    FROM test_results tr JOIN tests t ON t.id=tr.test_id
    WHERE tr.student_id=? ORDER BY t.test_date DESC LIMIT 5
  `).all(req.params.id);

  const feeStatus = db.prepare(`SELECT SUM(amount) as total, status FROM fees WHERE student_id=? GROUP BY status`).all(req.params.id);

  res.json({ success:true, data:{ ...student, recent_tests:recentTests, fee_summary:feeStatus } });
});

// POST /api/students
router.post('/', auth, (req, res) => {
  const db = getDb();
  const { roll_number,full_name,email,phone,batch_id,gender,city,guardian_name,guardian_phone,guardian_email } = req.body;
  if (!roll_number||!full_name||!email||!batch_id) return res.status(400).json({success:false,message:'Required fields missing'});
  try {
    const r = db.prepare(`INSERT INTO students (roll_number,full_name,email,phone,batch_id,gender,city,guardian_name,guardian_phone,guardian_email,avatar_seed) VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
      .run(roll_number,full_name,email,phone||null,batch_id,gender||null,city||null,guardian_name||null,guardian_phone||null,guardian_email||null,full_name.split(' ')[0].toLowerCase());
    res.status(201).json({ success:true, message:'Student created', data:{ id:r.lastInsertRowid } });
  } catch(e) {
    if (e.message.includes('UNIQUE')) return res.status(409).json({success:false,message:'Roll number or email already exists'});
    throw e;
  }
});

// PUT /api/students/:id
router.put('/:id', auth, (req, res) => {
  const db = getDb();
  const { full_name,email,phone,batch_id,gender,city,status,guardian_name,guardian_phone } = req.body;
  db.prepare(`UPDATE students SET full_name=COALESCE(?,full_name), email=COALESCE(?,email), phone=COALESCE(?,phone), batch_id=COALESCE(?,batch_id), gender=COALESCE(?,gender), city=COALESCE(?,city), status=COALESCE(?,status), guardian_name=COALESCE(?,guardian_name), guardian_phone=COALESCE(?,guardian_phone), updated_at=CURRENT_TIMESTAMP WHERE id=?`)
    .run(full_name,email,phone,batch_id,gender,city,status,guardian_name,guardian_phone,req.params.id);
  res.json({ success:true, message:'Student updated' });
});

// DELETE /api/students/:id
router.delete('/:id', auth, (req, res) => {
  const db = getDb();
  db.prepare('UPDATE students SET status=? WHERE id=?').run('Inactive', req.params.id);
  res.json({ success:true, message:'Student deactivated' });
});

module.exports = router;

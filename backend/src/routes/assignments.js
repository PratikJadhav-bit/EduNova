const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');
const { auth } = require('../middleware/auth');
router.get('/', auth, (req, res) => {
  const db = getDb();
  const { batch_id } = req.query;
  let w='WHERE 1=1'; const p=[];
  if(batch_id){w+=' AND a.batch_id=?';p.push(batch_id);}
  const rows = db.prepare(`SELECT a.*, b.name as batch_name, COUNT(sub.id) as total_students, SUM(CASE WHEN sub.status IN ('Submitted','Graded') THEN 1 ELSE 0 END) as submitted FROM assignments a LEFT JOIN batches b ON b.id=a.batch_id LEFT JOIN assignment_submissions sub ON sub.assignment_id=a.id ${w} GROUP BY a.id ORDER BY a.due_date`).all(...p);
  res.json({ success:true, data:rows });
});
router.post('/', auth, (req, res) => {
  const db = getDb();
  const {title,subject,batch_id,description,due_date,total_marks} = req.body;
  if (!title||!subject||!batch_id||!due_date) return res.status(400).json({success:false,message:'Required fields missing'});
  const r = db.prepare('INSERT INTO assignments (title,subject,batch_id,description,due_date,total_marks,created_by) VALUES (?,?,?,?,?,?,1)').run(title,subject,batch_id,description||null,due_date,total_marks||10);
  const students = db.prepare('SELECT id FROM students WHERE batch_id=? AND status="Active"').all(batch_id);
  const sub = db.prepare('INSERT OR IGNORE INTO assignment_submissions (assignment_id,student_id) VALUES (?,?)');
  for (const s of students) sub.run(r.lastInsertRowid, s.id);
  res.status(201).json({ success:true, data:{id:r.lastInsertRowid} });
});
module.exports = router;

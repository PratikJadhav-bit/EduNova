const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');
const { auth } = require('../middleware/auth');
router.get('/', auth, (req, res) => {
  const db = getDb();
  const { batch_id, status } = req.query;
  let w='WHERE 1=1'; const p=[];
  if(batch_id){w+=' AND t.batch_id=?';p.push(batch_id);}
  if(status){w+=' AND t.status=?';p.push(status);}
  const rows = db.prepare(`SELECT t.*, b.name as batch_name, ROUND(AVG(tr.percentage),1) as avg_score, COUNT(tr.id) as submissions FROM tests t LEFT JOIN batches b ON b.id=t.batch_id LEFT JOIN test_results tr ON tr.test_id=t.id ${w} GROUP BY t.id ORDER BY t.test_date DESC`).all(...p);
  res.json({ success:true, data:rows });
});
router.get('/:id/results', auth, (req, res) => {
  const db = getDb();
  const test = db.prepare('SELECT * FROM tests WHERE id=?').get(req.params.id);
  if (!test) return res.status(404).json({success:false,message:'Test not found'});
  const results = db.prepare('SELECT tr.*, s.full_name, s.roll_number, s.avatar_seed FROM test_results tr JOIN students s ON s.id=tr.student_id WHERE tr.test_id=? ORDER BY tr.rank_in_batch').all(req.params.id);
  res.json({ success:true, data:{ test, results } });
});
router.post('/', auth, (req, res) => {
  const db = getDb();
  const {title,subject,batch_id,total_marks,duration_min,test_date,test_type,instructions} = req.body;
  if (!title||!subject||!batch_id||!test_date) return res.status(400).json({success:false,message:'Required fields missing'});
  const r = db.prepare('INSERT INTO tests (title,subject,batch_id,total_marks,duration_min,test_date,test_type,instructions,created_by) VALUES (?,?,?,?,?,?,?,?,1)').run(title,subject,batch_id,total_marks||100,duration_min||60,test_date,test_type||'Quiz',instructions||null);
  res.status(201).json({ success:true, data:{id:r.lastInsertRowid} });
});
module.exports = router;

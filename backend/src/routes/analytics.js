const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');
const { auth } = require('../middleware/auth');

router.get('/dashboard', auth, (req, res) => {
  const db = getDb();
  const totalStudents = db.prepare('SELECT COUNT(*) as c FROM students WHERE status="Active"').get().c;
  const totalTeachers = db.prepare('SELECT COUNT(*) as c FROM teachers WHERE is_active=1').get().c;
  const avgAttend = db.prepare('SELECT ROUND(100.0*SUM(CASE WHEN status IN ("Present","Late") THEN 1 ELSE 0 END)/NULLIF(COUNT(*),0),1) as pct FROM attendance WHERE date >= date("now","-30 days")').get().pct;
  const avgScore = db.prepare('SELECT ROUND(AVG(percentage),1) as avg FROM test_results').get().avg;
  const revenue = db.prepare('SELECT SUM(amount) as total FROM fees WHERE status="Paid" AND strftime("%Y-%m",created_at)=strftime("%Y-%m","now")').get().total;
  const aiInsights = db.prepare('SELECT COUNT(*) as c FROM audit_log WHERE action="AI_INSIGHT"').get().c;
  const topStudents = db.prepare('SELECT s.full_name, s.avatar_seed, b.name as batch_name, ROUND(AVG(tr.percentage),1) as avg_score FROM students s JOIN batches b ON b.id=s.batch_id LEFT JOIN test_results tr ON tr.student_id=s.id GROUP BY s.id HAVING avg_score IS NOT NULL ORDER BY avg_score DESC LIMIT 5').all();
  const batchStats = db.prepare('SELECT * FROM v_batch_stats').all();
  const recentActivity = db.prepare('SELECT al.action, al.resource, al.details, al.created_at, u.full_name FROM audit_log al LEFT JOIN users u ON u.id=al.user_id ORDER BY al.created_at DESC LIMIT 10').all();
  res.json({ success:true, data:{ kpis:{ totalStudents, totalTeachers, avgAttend, avgScore, revenue, aiInsights }, topStudents, batchStats, recentActivity } });
});

router.get('/performance', auth, (req, res) => {
  const db = getDb();
  const { batch_id, subject } = req.query;
  let where = 'WHERE 1=1'; const p=[];
  if(batch_id){where+=' AND t.batch_id=?';p.push(batch_id);}
  if(subject){where+=' AND t.subject=?';p.push(subject);}
  const bySubject = db.prepare(`SELECT t.subject, ROUND(AVG(tr.percentage),1) as avg, MIN(tr.percentage) as min, MAX(tr.percentage) as max, COUNT(tr.id) as count FROM test_results tr JOIN tests t ON t.id=tr.test_id ${where} GROUP BY t.subject`).all(...p);
  const trend = db.prepare(`SELECT t.test_date, t.title, ROUND(AVG(tr.percentage),1) as avg FROM test_results tr JOIN tests t ON t.id=tr.test_id ${where} GROUP BY t.id ORDER BY t.test_date`).all(...p);
  const topStudents = db.prepare(`SELECT s.full_name, s.avatar_seed, ROUND(AVG(tr.percentage),1) as avg_score, COUNT(tr.id) as tests FROM test_results tr JOIN students s ON s.id=tr.student_id JOIN tests t ON t.id=tr.test_id ${where} GROUP BY s.id ORDER BY avg_score DESC LIMIT 10`).all(...p);
  res.json({ success:true, data:{ bySubject, trend, topStudents } });
});

router.get('/heatmap', auth, (req, res) => {
  const db = getDb();
  const { days=30 } = req.query;
  const rows = db.prepare(`SELECT a.date, s.batch_id, b.name as batch_name, ROUND(100.0*SUM(CASE WHEN a.status IN ('Present','Late') THEN 1 ELSE 0 END)/COUNT(*),1) as pct FROM attendance a JOIN students s ON s.id=a.student_id JOIN batches b ON b.id=s.batch_id WHERE a.date >= date('now',?) GROUP BY a.date, s.batch_id ORDER BY a.date`).all(`-${days} days`);
  res.json({ success:true, data:rows });
});

module.exports = router;

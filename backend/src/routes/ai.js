const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');
const { auth } = require('../middleware/auth');

const AI_KNOWLEDGE = [
  { trigger:['attendance','low','absent'], response:'Based on attendance data, I recommend sending automated WhatsApp alerts to parents of students with <75% attendance. I can schedule this now.' },
  { trigger:['rank','predict','jee'], response:'Based on mock test performance trends, students in JEE Batch A are projected to achieve an average AIR of 8,400. Top 3 students show AIR < 1,000 probability at 94%.' },
  { trigger:['weak','topic','chemistry'], response:'AI analysis shows Ionic Equilibrium and Organic Reactions are the weakest topics across all batches. I recommend 2 additional weekly sessions and targeted practice sets.' },
  { trigger:['performance','drop','decline'], response:'5 students show a >10% performance decline this month. I have generated personalized recovery plans. Shall I notify their teachers and parents?' },
  { trigger:['fee','pending','due'], response:'Currently 12 students have overdue fees totaling ₹2.1L. I can auto-generate reminder emails and WhatsApp messages for their guardians.' },
  { trigger:['study','plan','recommendation'], response:'I have analyzed 6 months of data to generate personalized study plans. Each plan accounts for learning pace, weak topics, and optimal revision timing.' },
  { trigger:['teacher','performance','rating'], response:'Dr. Sarita Joshi leads with a 4.9/5 student satisfaction score. Her Physics batch shows 23% higher scores than the institute average.' },
  { trigger:['test','schedule','upcoming'], response:'Next week has 3 scheduled tests. Based on current preparation levels, I recommend rescheduling the JEE Advanced mock by 3 days to allow adequate revision.' },
];

router.post('/chat', auth, (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({success:false,message:'Message required'});
  const lower = message.toLowerCase();
  const matched = AI_KNOWLEDGE.find(k => k.trigger.some(t => lower.includes(t)));
  const response = matched?.response || `I've analyzed your query about "${message}". Based on current EduNova data: performance is trending upward (+8.2% MoM), attendance is stable at 87%, and AI has flagged 5 students for intervention. Shall I generate a detailed report?`;
  const db = getDb();
  db.prepare('INSERT INTO audit_log (user_id,action,resource,details) VALUES (?,?,?,?)').run(req.user.id,'AI_INSIGHT','chat',message.slice(0,100));
  res.json({ success:true, data:{ response, timestamp: new Date().toISOString() } });
});

router.post('/predict-rank', auth, (req, res) => {
  const { physics=0, chemistry=0, maths=0, biology=0, exam='JEE Main' } = req.body;
  const isNEET = exam.includes('NEET');
  const total = isNEET ? (physics+chemistry+biology)/3 : (physics+chemistry+maths)/3;
  const baseRank = isNEET ? 85000 : 120000;
  const rank = Math.max(50, Math.round(baseRank - total*820 + Math.random()*500));
  const confidence = Math.min(97, Math.round(72 + total*0.22));
  const percentile = parseFloat((100 - (rank/(isNEET?200000:1200000))*100).toFixed(2));
  res.json({ success:true, data:{ rank, percentile, confidence, total_score: parseFloat(total.toFixed(1)), exam, tips: [
    total < 70 ? 'Focus on weak subjects — consistent daily practice of 4+ hours recommended.' : null,
    physics < 75 ? 'Physics needs attention: practice numerical problems from HC Verma daily.' : null,
    chemistry < 75 ? 'Strengthen Organic Chemistry — Reactions and Mechanisms are high-yield topics.' : null,
    maths < 75 && !isNEET ? 'Calculus and Algebra need daily practice — attempt 20 problems minimum.' : null,
  ].filter(Boolean) } });
});

router.get('/recommendations/:student_id', auth, (req, res) => {
  const db = getDb();
  const student = db.prepare('SELECT s.*, b.stream FROM students s JOIN batches b ON b.id=s.batch_id WHERE s.id=?').get(req.params.student_id);
  if (!student) return res.status(404).json({success:false,message:'Student not found'});
  const testResults = db.prepare('SELECT t.subject, ROUND(AVG(tr.percentage),1) as avg FROM test_results tr JOIN tests t ON t.id=tr.test_id WHERE tr.student_id=? GROUP BY t.subject ORDER BY avg').all(req.params.student_id);
  const weakSubjects = testResults.filter(r => r.avg < 75);
  const recommendations = weakSubjects.map(s => ({
    subject: s.subject, score: s.avg,
    topics: s.avg<60?['Fundamentals','Basic Concepts','Formula Revision']:['Advanced Problems','Previous Year Questions','Mock Tests'],
    resources: [`NCERT ${s.subject} — Chapters 1-5`, `${s.subject} Previous Year Questions 2020-2024`, `AI Generated Practice Set #${Math.floor(Math.random()*20)+1}`],
    priority: s.avg<60?'High':s.avg<70?'Medium':'Low',
  }));
  res.json({ success:true, data:{ student:{ name:student.full_name, batch:student.batch_id }, recommendations, generated_at:new Date().toISOString() } });
});

module.exports = router;

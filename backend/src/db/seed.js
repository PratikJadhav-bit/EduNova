// ================================================
//  EduNova — Realistic Seed Data
// ================================================
const bcrypt = require('bcryptjs');
const { getDb } = require('./database');

const HASH = bcrypt.hashSync('EduNova@2026', 10);

const BATCHES = [
  { name: 'JEE Batch A', stream: 'JEE', year: 2026, capacity: 36, room: 'Hall 101' },
  { name: 'JEE Batch B', stream: 'JEE', year: 2026, capacity: 36, room: 'Hall 102' },
  { name: 'NEET Batch A', stream: 'NEET', year: 2026, capacity: 34, room: 'Hall 201' },
  { name: 'NEET Batch B', stream: 'NEET', year: 2026, capacity: 30, room: 'Hall 202' },
  { name: 'Foundation', stream: 'Foundation', year: 2026, capacity: 40, room: 'Hall 301' },
];

const STUDENTS_DATA = [
  { name:'Priya Agarwal',    roll:'JEE-26-001', batch:1, attend:97, scores:[98,95,96,99], gender:'Female', city:'Delhi' },
  { name:'Rahul Verma',      roll:'JEE-26-002', batch:1, attend:94, scores:[88,91,87,90], gender:'Male',   city:'Noida' },
  { name:'Ananya Singh',     roll:'JEE-26-003', batch:1, attend:91, scores:[82,85,80,84], gender:'Female', city:'Gurgaon' },
  { name:'Karan Malhotra',   roll:'JEE-26-004', batch:1, attend:88, scores:[91,89,93,92], gender:'Male',   city:'Delhi' },
  { name:'Arjun Kapoor',     roll:'JEE-26-005', batch:1, attend:82, scores:[74,70,68,72], gender:'Male',   city:'Faridabad' },
  { name:'Mehak Joshi',      roll:'JEE-26-006', batch:1, attend:90, scores:[79,83,81,77], gender:'Female', city:'Delhi' },
  { name:'Siddharth Nair',   roll:'JEE-26-007', batch:2, attend:85, scores:[86,84,88,82], gender:'Male',   city:'Ghaziabad' },
  { name:'Pooja Reddy',      roll:'JEE-26-008', batch:2, attend:92, scores:[77,80,75,79], gender:'Female', city:'Noida' },
  { name:'Rohan Gupta',      roll:'JEE-26-009', batch:1, attend:55, scores:[58,62,55,60], gender:'Male',   city:'Delhi' },
  { name:'Sneha Patel',      roll:'NEE-26-001', batch:3, attend:78, scores:[84,87,82,85], gender:'Female', city:'Ahmedabad' },
  { name:'Vikram Bose',      roll:'JEE-26-010', batch:2, attend:89, scores:[79,76,81,78], gender:'Male',   city:'Kolkata' },
  { name:'Meera Nair',       roll:'NEE-26-002', batch:3, attend:95, scores:[93,91,95,92], gender:'Female', city:'Kochi' },
  { name:'Pooja Jain',       roll:'NEE-26-003', batch:4, attend:92, scores:[88,85,87,90], gender:'Female', city:'Jaipur' },
  { name:'Aditya Kumar',     roll:'JEE-26-011', batch:1, attend:85, scores:[77,80,74,78], gender:'Male',   city:'Patna' },
  { name:'Riya Sharma',      roll:'NEE-26-004', batch:4, attend:62, scores:[68,64,70,65], gender:'Female', city:'Mumbai' },
  { name:'Nikhil Jaiswal',   roll:'JEE-26-012', batch:2, attend:88, scores:[85,88,82,87], gender:'Male',   city:'Varanasi' },
  { name:'Divya Krishnan',   roll:'NEE-26-005', batch:3, attend:93, scores:[90,92,88,91], gender:'Female', city:'Chennai' },
  { name:'Harsh Gupta',      roll:'JEE-26-013', batch:1, attend:76, scores:[72,68,75,70], gender:'Male',   city:'Lucknow' },
  { name:'Tanvi Mehta',      roll:'NEE-26-006', batch:4, attend:87, scores:[82,79,84,81], gender:'Female', city:'Surat' },
  { name:'Ayaan Khan',       roll:'JEE-26-014', batch:2, attend:91, scores:[89,87,91,85], gender:'Male',   city:'Hyderabad' },
];

const TEACHERS_DATA = [
  { name:'Dr. Sarita Joshi',    emp:'TCH-001', subject:'Physics',   spec:'Electrostatics & Optics',    qual:'Ph.D Physics', exp:12, rating:4.9, seed:'sarita',  bg:'dbeafe' },
  { name:'Prof. Ravi Shankar',  emp:'TCH-002', subject:'Chemistry', spec:'Organic & Inorganic Chem',  qual:'M.Sc Chemistry',exp:8, rating:4.8, seed:'ravi',    bg:'dcfce7' },
  { name:'Ms. Preethi Menon',   emp:'TCH-003', subject:'Maths',     spec:'Calculus & Algebra',        qual:'M.Tech Maths',  exp:6, rating:4.7, seed:'preethi', bg:'fef3c7' },
  { name:'Dr. Amit Srivastava', emp:'TCH-004', subject:'Biology',   spec:'Human Physiology & Botany', qual:'Ph.D Biology',  exp:10, rating:4.6, seed:'amit',    bg:'ede9fe' },
  { name:'Mr. Suresh Iyer',     emp:'TCH-005', subject:'Physics',   spec:'Mechanics & Thermodynamics',qual:'M.Sc Physics',  exp:7, rating:4.5, seed:'suresh',  bg:'fee2e2' },
  { name:'Dr. Kavita Reddy',    emp:'TCH-006', subject:'Chemistry', spec:'Physical Chemistry',        qual:'Ph.D Chemistry',exp:9, rating:4.8, seed:'kavita',  bg:'fce7f3' },
];

function seed() {
  const db = getDb();

  // Check if already seeded
  const existing = db.prepare('SELECT COUNT(*) as cnt FROM students').get();
  if (existing.cnt > 0) {
    console.log('✅ Database already seeded, skipping.');
    return;
  }

  console.log('🌱 Seeding database...');

  // Admin user
  db.prepare(`INSERT OR IGNORE INTO users (email, password_hash, role, full_name, avatar_seed) VALUES (?,?,?,?,?)`)
    .run('admin@edunova.in', HASH, 'admin', 'Dr. Aryan Mehta', 'admin');

  // Batches
  const insertBatch = db.prepare(`INSERT OR IGNORE INTO batches (name, stream, year, capacity, room) VALUES (?,?,?,?,?)`);
  for (const b of BATCHES) insertBatch.run(b.name, b.stream, b.year, b.capacity, b.room);

  // Teachers
  const insertTeacher = db.prepare(`INSERT OR IGNORE INTO teachers (employee_id,full_name,email,subject,specialization,qualification,experience_yrs,rating,monthly_classes,avatar_seed) VALUES (?,?,?,?,?,?,?,?,?,?)`);
  for (const t of TEACHERS_DATA) {
    insertTeacher.run(t.emp, t.name, `${t.seed}@edunova.in`, t.subject, t.spec, t.qual, t.exp, t.rating, 38 + Math.floor(Math.random()*10), t.seed);
  }

  // Students
  const insertUser = db.prepare(`INSERT INTO users (email,password_hash,role,full_name,avatar_seed) VALUES (?,?,?,?,?)`);
  const insertStudent = db.prepare(`INSERT INTO students (user_id,roll_number,full_name,email,gender,city,batch_id,guardian_name,guardian_phone,avatar_seed,status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`);
  const students = [];
  for (const s of STUDENTS_DATA) {
    const seed = s.name.split(' ')[0].toLowerCase();
    const userRes = insertUser.run(`${seed}@edunova.in`, HASH, 'student', s.name, seed);
    const sRes = insertStudent.run(userRes.lastInsertRowid, s.roll, s.name, `${seed}@edunova.in`, s.gender, s.city, s.batch, `${s.gender === 'Female' ? 'Mrs' : 'Mr'}. ${s.name.split(' ').slice(-1)[0]} Sr.`, `9${Math.floor(Math.random()*1e9).toString().padStart(9,'0')}`, seed, s.attend < 65 ? 'Active' : 'Active');
    students.push({ id: sRes.lastInsertRowid, ...s });
  }

  // Attendance — last 30 days
  const insertAttend = db.prepare(`INSERT OR IGNORE INTO attendance (student_id,batch_id,date,status) VALUES (?,?,?,?)`);
  const today = new Date();
  for (let d = 30; d >= 0; d--) {
    const date = new Date(today);
    date.setDate(today.getDate() - d);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) continue; // Skip Sundays
    const dateStr = date.toISOString().split('T')[0];

    for (const s of students) {
      const rand = Math.random() * 100;
      const threshold = s.attend;
      const status = rand < threshold ? (Math.random() < 0.05 ? 'Late' : 'Present') : (Math.random() < 0.3 ? 'Leave' : 'Absent');
      insertAttend.run(s.id, s.batch, dateStr, status);
    }
  }

  // Tests
  const tests = [
    { title:'JEE Main Full Mock #5',    subject:'All Subjects', batch_id:1, total:300, dur:180, date:'2026-05-26', type:'Full Syllabus', status:'Completed' },
    { title:'NEET Biology Sprint',      subject:'Biology',      batch_id:3, total:180, dur:90,  date:'2026-05-26', type:'Mock',          status:'Completed' },
    { title:'Physics Weekly Quiz',      subject:'Physics',      batch_id:2, total:40,  dur:45,  date:'2026-05-27', type:'Quiz',          status:'Completed' },
    { title:'Chemistry Organic II',     subject:'Chemistry',    batch_id:4, total:60,  dur:60,  date:'2026-05-28', type:'Chapter',       status:'Completed' },
    { title:'Maths Advanced #3',        subject:'Maths',        batch_id:1, total:100, dur:120, date:'2026-05-30', type:'Chapter',       status:'Completed' },
    { title:'NEET Full Syllabus Mock',  subject:'All Subjects', batch_id:3, total:720, dur:180, date:'2026-06-02', type:'Full Syllabus', status:'Scheduled' },
    { title:'JEE Advanced Mock #1',     subject:'All Subjects', batch_id:1, total:360, dur:180, date:'2026-06-05', type:'Mock',          status:'Scheduled' },
    { title:'Thermodynamics Test',      subject:'Physics',      batch_id:2, total:50,  dur:60,  date:'2026-06-07', type:'Chapter',       status:'Scheduled' },
  ];
  const insertTest = db.prepare(`INSERT INTO tests (title,subject,batch_id,total_marks,duration_min,test_date,test_type,status,created_by) VALUES (?,?,?,?,?,?,?,?,1)`);
  const testResults = [];
  for (const t of tests) {
    const r = insertTest.run(t.title, t.subject, t.batch_id, t.total, t.dur, t.date, t.type, t.status);
    testResults.push({ id: r.lastInsertRowid, batch_id: t.batch_id, total: t.total, status: t.status });
  }

  // Test results for completed tests
  const insertResult = db.prepare(`INSERT OR IGNORE INTO test_results (test_id,student_id,marks_obtained,percentage,rank_in_batch,time_taken,attempted,correct,wrong) VALUES (?,?,?,?,?,?,?,?,?)`);
  for (const test of testResults.filter(t => t.status === 'Completed')) {
    const batchStudents = students.filter(s => s.batch === test.batch_id);
    const ranked = batchStudents.map(s => {
      const avgScore = (s.scores.reduce((a,b)=>a+b,0)/s.scores.length) / 100;
      const marks = Math.round(test.total * avgScore * (0.9 + Math.random()*0.2));
      return { ...s, marks: Math.min(marks, test.total) };
    }).sort((a,b) => b.marks - a.marks);

    ranked.forEach((s, idx) => {
      const pct = parseFloat(((s.marks / test.total) * 100).toFixed(1));
      const total_q = Math.round(test.total / 4);
      const correct = Math.round(total_q * (pct/100));
      const wrong   = Math.round((total_q - correct) * 0.3);
      insertResult.run(test.id, s.id, s.marks, pct, idx+1, Math.floor(Math.random()*30)+test.total*0.3, total_q, correct, wrong);
    });
  }

  // Fees
  const insertFee = db.prepare(`INSERT INTO fees (student_id,amount,fee_type,payment_method,paid_date,due_date,status) VALUES (?,?,?,?,?,?,?)`);
  const methods = ['UPI','Cash','Bank Transfer','Card'];
  for (const s of students) {
    const feeAmt = s.batch <= 2 ? 18500 : 16000;
    const dueDate = '2026-06-01';
    const paid = Math.random() > 0.2;
    insertFee.run(s.id, feeAmt, 'Tuition', paid ? methods[Math.floor(Math.random()*methods.length)] : null, paid ? '2026-05-' + (10+Math.floor(Math.random()*15)).toString().padStart(2,'0') : null, dueDate, paid ? 'Paid' : (Math.random() > 0.5 ? 'Pending' : 'Overdue'));
    if (Math.random() > 0.7) {
      insertFee.run(s.id, 1500, 'Study Material', 'UPI', '2026-05-05', '2026-05-01', 'Paid');
    }
  }

  // Assignments
  const assignments = [
    { title:'Kinematics & Projectile Motion', subject:'Physics',   batch_id:1, due:'2026-05-28', status:'Active',    marks:10 },
    { title:'Organic Chemistry: Reactions',    subject:'Chemistry', batch_id:3, due:'2026-05-30', status:'Active',    marks:10 },
    { title:'Integration Advanced Problems',   subject:'Maths',     batch_id:2, due:'2026-05-27', status:'Due Soon',  marks:15 },
    { title:'Human Physiology Notes',          subject:'Biology',   batch_id:4, due:'2026-06-02', status:'Upcoming',  marks:10 },
    { title:'Electrostatics Deep Dive',        subject:'Physics',   batch_id:1, due:'2026-06-05', status:'Upcoming',  marks:20 },
    { title:'Chemical Bonding Worksheet',      subject:'Chemistry', batch_id:1, due:'2026-05-25', status:'Completed', marks:10 },
  ];
  const insertAssign = db.prepare(`INSERT INTO assignments (title,subject,batch_id,due_date,total_marks,created_by,status) VALUES (?,?,?,?,?,1,?)`);
  const insertSub = db.prepare(`INSERT OR IGNORE INTO assignment_submissions (assignment_id,student_id,submitted_at,status) VALUES (?,?,?,?)`);
  for (const a of assignments) {
    const r = insertAssign.run(a.title, a.subject, a.batch_id, a.due, a.marks, a.status);
    const batchStudents = students.filter(s => s.batch === a.batch_id);
    for (const s of batchStudents) {
      const submitted = a.status === 'Completed' ? true : (a.status === 'Active' ? Math.random() > 0.25 : false);
      if (submitted) {
        insertSub.run(r.lastInsertRowid, s.id, new Date().toISOString(), 'Submitted');
      } else {
        insertSub.run(r.lastInsertRowid, s.id, null, 'Pending');
      }
    }
  }

  console.log('✅ Database seeded successfully!');
}

module.exports = { seed };

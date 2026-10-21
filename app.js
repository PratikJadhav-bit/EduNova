/* ===========================
   EDUNOVA — App JavaScript
   =========================== */

'use strict';

/* ============ DATA ============ */
const STUDENTS = [
  { id:1, name:'Priya Agarwal',   roll:'JEE-26-001', batch:'JEE Batch A', attend:97, score:98.4, status:'Excelling', fee:'Paid',   avatar:'priya',   bg:'fef3c7' },
  { id:2, name:'Rahul Verma',     roll:'NEE-26-001', batch:'NEET Batch A',attend:94, score:97.1, status:'Excelling', fee:'Paid',   avatar:'rahul',   bg:'ede9fe' },
  { id:3, name:'Ananya Singh',    roll:'JEE-26-002', batch:'JEE Batch B', attend:91, score:96.8, status:'Excelling', fee:'Paid',   avatar:'ananya',  bg:'dbeafe' },
  { id:4, name:'Karan Malhotra',  roll:'JEE-26-003', batch:'JEE Batch A', attend:88, score:95.5, status:'On Track',  fee:'Paid',   avatar:'karan',   bg:'dcfce7' },
  { id:5, name:'Arjun Kapoor',    roll:'JEE-26-004', batch:'JEE Batch A', attend:82, score:74.0, status:'At Risk',   fee:'Paid',   avatar:'arjun',   bg:'fee2e2' },
  { id:6, name:'Riya Sharma',     roll:'NEE-26-002', batch:'NEET Batch B',attend:62, score:68.0, status:'At Risk',   fee:'Paid',   avatar:'riya',    bg:'fce7f3' },
  { id:7, name:'Rohan Gupta',     roll:'JEE-26-005', batch:'JEE Batch A', attend:55, score:60.2, status:'High Risk', fee:'Overdue',avatar:'rohan',   bg:'fef9c3' },
  { id:8, name:'Sneha Patel',     roll:'NEE-26-003', batch:'NEET Batch A',attend:78, score:84.3, status:'On Track',  fee:'Pending',avatar:'sneha',   bg:'e0f2fe' },
  { id:9, name:'Vikram Bose',     roll:'JEE-26-006', batch:'JEE Batch B', attend:89, score:79.7, status:'On Track',  fee:'Paid',   avatar:'vikram',  bg:'f3e8ff' },
  { id:10,name:'Pooja Jain',      roll:'NEE-26-004', batch:'NEET Batch B',attend:92, score:88.1, status:'Excelling', fee:'Paid',   avatar:'pooja',   bg:'d1fae5' },
  { id:11,name:'Aditya Kumar',    roll:'JEE-26-007', batch:'JEE Batch A', attend:85, score:77.4, status:'On Track',  fee:'Paid',   avatar:'aditya',  bg:'fff7ed' },
  { id:12,name:'Meera Nair',      roll:'NEE-26-005', batch:'NEET Batch A',attend:95, score:93.2, status:'Excelling', fee:'Paid',   avatar:'meera',   bg:'ecfdf5' },
];

const TEACHERS = [
  { id:1, name:'Dr. Sarita Joshi',    subject:'Physics',   students:186, rating:4.9, classes:42, avatar:'sarita',  bg:'dbeafe' },
  { id:2, name:'Prof. Ravi Shankar',  subject:'Chemistry', students:174, rating:4.8, classes:38, avatar:'ravi',    bg:'dcfce7' },
  { id:3, name:'Ms. Preethi Menon',   subject:'Maths',     students:201, rating:4.7, classes:45, avatar:'preethi', bg:'fef3c7' },
  { id:4, name:'Dr. Amit Srivastava', subject:'Biology',   students:158, rating:4.6, classes:36, avatar:'amit',    bg:'ede9fe' },
  { id:5, name:'Mr. Suresh Iyer',     subject:'Physics',   students:143, rating:4.5, classes:40, avatar:'suresh',  bg:'fee2e2' },
  { id:6, name:'Dr. Kavita Reddy',    subject:'Chemistry', students:167, rating:4.8, classes:37, avatar:'kavita',  bg:'fce7f3' },
];

const ASSIGNMENTS = [
  { id:1, title:'Kinematics & Projectile Motion',    subject:'Physics',   batch:'JEE Batch A', due:'May 28',  submissions:28, total:36, status:'Active',    color:'#4f46e5' },
  { id:2, title:'Organic Chemistry: Reactions',      subject:'Chemistry', batch:'NEET Batch A',due:'May 30',  submissions:31, total:34, status:'Active',    color:'#059669' },
  { id:3, title:'Integration — Advanced Problems',   subject:'Maths',     batch:'JEE Batch B', due:'May 27',  submissions:12, total:32, status:'Due Soon',  color:'#d97706' },
  { id:4, title:'Human Physiology Notes',            subject:'Biology',   batch:'NEET Batch B',due:'Jun 2',   submissions:0,  total:30, status:'Upcoming',  color:'#0891b2' },
  { id:5, title:'Electrostatics Deep Dive',          subject:'Physics',   batch:'JEE Batch A', due:'Jun 5',   submissions:0,  total:36, status:'Upcoming',  color:'#4f46e5' },
  { id:6, title:'Chemical Bonding Worksheet',        subject:'Chemistry', batch:'JEE Batch A', due:'May 25',  submissions:36, total:36, status:'Completed', color:'#059669' },
];

const TESTS = [
  { id:1, name:'JEE Main Full Mock #5',     batch:'JEE Batch A', date:'May 26',  dur:'3 hrs', students:36, avg:74.2, status:'Completed' },
  { id:2, name:'NEET Biology Sprint Test',  batch:'NEET Batch A',date:'May 26',  dur:'90 min',students:34, avg:81.1, status:'Completed' },
  { id:3, name:'Physics Weekly Quiz',       batch:'JEE Batch B', date:'May 27',  dur:'45 min',students:32, avg:null, status:'Live' },
  { id:4, name:'Chemistry Organic Part II', batch:'NEET Batch B',date:'May 27',  dur:'60 min',students:30, avg:null, status:'Live' },
  { id:5, name:'Maths Advanced Series #3',  batch:'JEE Batch A', date:'May 28',  dur:'2 hrs', students:36, avg:null, status:'Scheduled' },
  { id:6, name:'NEET Full Syllabus Mock',   batch:'NEET Batch A',date:'May 30',  dur:'3 hrs', students:34, avg:null, status:'Scheduled' },
  { id:7, name:'Thermodynamics Test',       batch:'JEE Batch B', date:'Jun 2',   dur:'1 hr',  students:32, avg:null, status:'Scheduled' },
  { id:8, name:'Chemistry Inorganic Quiz',  batch:'JEE Batch A', date:'May 24',  dur:'45 min',students:36, avg:69.8, status:'Live' },
];

const FEES = [
  { student:'Priya Agarwal',  batch:'JEE Batch A', amount:'₹18,500', type:'Tuition',    date:'May 20', status:'Paid' },
  { student:'Rahul Verma',    batch:'NEET Batch A',amount:'₹16,000', type:'Tuition',    date:'May 19', status:'Paid' },
  { student:'Ananya Singh',   batch:'JEE Batch B', amount:'₹18,500', type:'Tuition',    date:'May 18', status:'Paid' },
  { student:'Karan Malhotra', batch:'JEE Batch A', amount:'₹18,500', type:'Tuition',    date:'May 15', status:'Paid' },
  { student:'Sneha Patel',    batch:'NEET Batch A',amount:'₹16,000', type:'Tuition',    date:'May 10', status:'Pending' },
  { student:'Rohan Gupta',    batch:'JEE Batch A', amount:'₹18,500', type:'Tuition',    date:'Apr 20', status:'Overdue' },
  { student:'Riya Sharma',    batch:'NEET Batch B',amount:'₹2,000',  type:'Study Material',date:'May 22', status:'Paid' },
  { student:'Vikram Bose',    batch:'JEE Batch B', amount:'₹1,500',  type:'Lab Fee',    date:'May 21', status:'Paid' },
];

const PARENTS = [
  { name:'Mrs. Sunita Kapoor',  child:'Arjun Kapoor',   batch:'JEE Batch A', seed:'parentmrs',  bg:'fef3c7', unread:true },
  { name:'Mr. Ramesh Sharma',   child:'Riya Sharma',    batch:'NEET Batch B',seed:'parentmr',   bg:'ede9fe', unread:true },
  { name:'Mrs. Anita Gupta',    child:'Rohan Gupta',    batch:'JEE Batch A', seed:'parentanita',bg:'dbeafe', unread:false },
  { name:'Mr. Sunil Verma',     child:'Rahul Verma',    batch:'NEET Batch A',seed:'parentsunil',bg:'dcfce7', unread:false },
  { name:'Mrs. Priya Joshi',    child:'Karan Malhotra', batch:'JEE Batch A', seed:'parentpriya',bg:'fce7f3', unread:true },
  { name:'Mr. Arun Singh',      child:'Ananya Singh',   batch:'JEE Batch B', seed:'parentarun', bg:'fee2e2', unread:false },
];

const RECOMMENDATIONS = [
  { student:'Arjun Kapoor',   batch:'JEE Batch A', seed:'arjun',  bg:'fee2e2', score:74, weakTopics:['Rotational Motion','Complex Numbers','Ionic Equilibrium'], resources:['Khan Academy — Rotational Physics','NCERT Ex. 7.8','Mock drill set #12'] },
  { student:'Riya Sharma',    batch:'NEET Batch B', seed:'riya',   bg:'fce7f3', score:68, weakTopics:['Human Physiology','Genetics','Plant Kingdom'],             resources:['NCERT Biology Ch.20','Mindmaps: Genetics','Video: Cell Division'] },
  { student:'Rohan Gupta',    batch:'JEE Batch A', seed:'rohan',  bg:'fee2e2', score:60, weakTopics:['Electrostatics','Organic Reactions','Calculus Basics'],     resources:['HC Verma Vol.2','NCERT Ex. 12','JEE Module 4 practice'] },
  { student:'Sneha Patel',    batch:'NEET Batch A',seed:'sneha',  bg:'e0f2fe', score:84, weakTopics:['Inorganic Chemistry','Ecology'],                            resources:['NCERT Ch.14','AIIMS previous papers','Ecology mindmap'] },
  { student:'Karan Malhotra', batch:'JEE Batch A', seed:'karan',  bg:'dcfce7', score:95, weakTopics:['Optics','Probability'],                                    resources:['Optics Masterclass','JEE Advanced 2024 solutions'] },
  { student:'Vikram Bose',    batch:'JEE Batch B', seed:'vikram', bg:'f3e8ff', score:79, weakTopics:['Thermodynamics','Matrices','Coordinate Geometry'],          resources:['Physics Galaxy Ch.8','NCERT Exemplar Maths'] },
];

const RANK_DATA = [
  { student:'Priya Agarwal',  batch:'JEE Batch A', score:'98.4%', rank:'AIR 124',  conf:96 },
  { student:'Rahul Verma',    batch:'NEET Batch A',score:'97.1%', rank:'AIR 287',  conf:94 },
  { student:'Ananya Singh',   batch:'JEE Batch B', score:'96.8%', rank:'AIR 342',  conf:93 },
  { student:'Karan Malhotra', batch:'JEE Batch A', score:'95.5%', rank:'AIR 518',  conf:91 },
  { student:'Meera Nair',     batch:'NEET Batch A',score:'93.2%', rank:'AIR 743',  conf:89 },
  { student:'Pooja Jain',     batch:'NEET Batch B',score:'88.1%', rank:'AIR 1,204',conf:87 },
];

const TT_DATA = {
  'JEE A': [
    ['Physics – Dr. Joshi','Chemistry – Prof. Ravi','--','Maths – Ms. Preethi','Physics Lab','Physics – Dr. Joshi'],
    ['Maths – Ms. Preethi','--','Physics – Dr. Joshi','Chemistry – Prof. Ravi','Maths – Ms. Preethi','--'],
    ['Chemistry – Prof. Ravi','Maths – Ms. Preethi','Chemistry – Prof. Ravi','--','Physics – Dr. Joshi','Maths – Ms. Preethi'],
    ['--','Physics – Dr. Joshi','Maths – Ms. Preethi','Physics Lab','Chemistry – Prof. Ravi','Physics – Dr. Joshi'],
  ],
  'JEE B': [
    ['Maths – Ms. Preethi','Physics – Mr. Suresh','Chemistry – Dr. Kavita','--','Maths – Ms. Preethi','Physics – Mr. Suresh'],
    ['Physics – Mr. Suresh','--','Maths – Ms. Preethi','Physics – Mr. Suresh','Chemistry – Dr. Kavita','--'],
    ['Chemistry – Dr. Kavita','Maths – Ms. Preethi','--','Chemistry – Dr. Kavita','Physics – Mr. Suresh','Maths – Ms. Preethi'],
    ['--','Chemistry – Dr. Kavita','Physics – Mr. Suresh','Maths – Ms. Preethi','--','Chemistry – Dr. Kavita'],
  ],
  'NEET A': [
    ['Biology – Dr. Amit','Physics – Dr. Joshi','Chemistry – Prof. Ravi','--','Biology – Dr. Amit','Physics – Dr. Joshi'],
    ['Physics – Dr. Joshi','--','Biology – Dr. Amit','Chemistry – Prof. Ravi','Physics – Dr. Joshi','--'],
    ['Chemistry – Prof. Ravi','Biology – Dr. Amit','--','Biology Lab','Chemistry – Prof. Ravi','Biology – Dr. Amit'],
    ['--','Chemistry – Prof. Ravi','Physics – Dr. Joshi','Biology – Dr. Amit','--','Chemistry – Prof. Ravi'],
  ],
};

const SLOT_COLORS = {
  'Physics':   { bg:'rgba(79,70,229,0.1)',   color:'#4f46e5' },
  'Chemistry': { bg:'rgba(5,150,105,0.1)',    color:'#059669' },
  'Maths':     { bg:'rgba(217,119,6,0.1)',    color:'#d97706' },
  'Biology':   { bg:'rgba(8,145,178,0.1)',    color:'#0891b2' },
  'Lab':       { bg:'rgba(124,58,237,0.1)',   color:'#7c3aed' },
  '--':        { bg:'transparent',            color:'#94a3b8' },
};

const TOPIC_HEATMAP_DATA = {
  subjects: ['Physics','Chemistry','Maths','Biology'],
  topics: [
    { name:'Kinematics',         scores:[88,null,null,null] },
    { name:'Thermodynamics',     scores:[62,null,null,null] },
    { name:'Electrostatics',     scores:[58,null,null,null] },
    { name:'Organic Chem',       scores:[null,82,null,null] },
    { name:'Ionic Equilibrium',  scores:[null,64,null,null] },
    { name:'Coordination',       scores:[null,91,null,null] },
    { name:'Calculus',           scores:[null,null,74,null] },
    { name:'Algebra',            scores:[null,null,87,null] },
    { name:'Probability',        scores:[null,null,69,null] },
    { name:'Cell Biology',       scores:[null,null,null,79] },
    { name:'Genetics',           scores:[null,null,null,65] },
    { name:'Ecology',            scores:[null,null,null,88] },
  ],
};

const AI_RESPONSES = [
  'Based on the current data, I recommend increasing focus on <strong>Electrostatics</strong> for JEE Batch A. 12 students score below 65% in this topic.',
  '✅ Done! I\'ve generated a weekly revision schedule for all at-risk students. Sessions are now added to the smart timetable.',
  'The AI analysis shows that students who attend <strong>more than 90% of classes</strong> score 23% higher on average. Let me send attendance reminders?',
  '📊 Rank predictions updated! Top 3 students show a combined average improvement of <strong>8.4%</strong> over the last month.',
  'I\'ve identified <strong>3 students</strong> whose exam performance doesn\'t match their class quiz scores — possible exam anxiety. Recommend counseling.',
  '🎯 Study plan generated! Based on learning styles and past performance, I\'ve customized daily 2-hour revision slots for all students.',
];

let aiResponseIndex = 0;
let currentBatch = 'JEE A';
let attendanceState = {};
let filteredStudents = [...STUDENTS];

/* ============ NAVIGATION ============ */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  const navItem = document.querySelector(`[data-page="${pageId}"]`);
  if (navItem) navItem.classList.add('active');

  const labels = {
    dashboard: 'Dashboard', students: 'Students', attendance: 'Attendance',
    timetable: 'Timetable', assignments: 'Assignments', tests: 'Online Tests',
    analytics: 'AI Analytics', recommendations: 'AI Recommendations',
    ranks: 'Rank Predictor', fees: 'Fee Tracking', teachers: 'Teachers',
    parents: 'Parent Comms',
  };
  document.getElementById('breadcrumbCurrent').textContent = labels[pageId] || pageId;

  // Init page data on first visit
  const inits = {
    students: renderStudentsTable,
    attendance: renderAttendanceGrid,
    timetable: renderTimetable,
    assignments: renderAssignments,
    tests: renderTests,
    analytics: renderAnalytics,
    recommendations: renderRecommendations,
    ranks: renderRankTable,
    fees: renderFees,
    teachers: renderTeachers,
    parents: renderParents,
  };
  if (inits[pageId]) inits[pageId]();

  // Close sidebar on mobile
  if (window.innerWidth < 900) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function toggleNotifications() {
  document.getElementById('notifPanel').classList.toggle('open');
}

/* ============ COUNTER ANIMATION ============ */
function animateCounters() {
  document.querySelectorAll('.kpi-value[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ============ HEATMAP ============ */
function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const colors = ['#e5e7eb','#bfdbfe','#93c5fd','#3b82f6','#1d4ed8'];
  for (let d = 1; d <= 31; d++) {
    const cell = document.createElement('div');
    cell.className = 'heatmap-cell';
    const val = Math.random();
    const level = d > 26 ? 0 : Math.floor(val * 5);
    cell.style.background = colors[level];
    const pct = [0,25,50,75,92][level];
    cell.dataset.tip = `Jun ${d}: ${d > 26 ? 'Future' : pct + '% attendance'}`;
    grid.appendChild(cell);
  }
}

/* ============ STUDENTS TABLE ============ */
function renderStudentsTable() {
  const tbody = document.getElementById('studentsTableBody');
  if (!tbody) return;
  tbody.innerHTML = filteredStudents.map(s => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}&backgroundColor=${s.bg}" style="width:34px;height:34px;border-radius:8px" />
          <div>
            <div style="font-weight:600;color:var(--text-primary);font-size:13.5px">${s.name}</div>
            <div style="font-size:11px;color:var(--text-muted)">${s.roll}</div>
          </div>
        </div>
      </td>
      <td><span style="font-family:'JetBrains Mono',monospace;font-size:12px">${s.roll}</span></td>
      <td><span class="status-badge badge-info">${s.batch}</span></td>
      <td>
        <div class="progress-bar-wrap">
          <div class="progress-bar"><div class="progress-fill" style="width:${s.attend}%;background:${s.attend>80?'var(--success)':s.attend>65?'var(--warning)':'var(--danger)'}"></div></div>
          <span class="progress-label">${s.attend}%</span>
        </div>
      </td>
      <td><strong style="color:${s.score>90?'var(--success)':s.score>75?'var(--primary)':'var(--danger)'}">${s.score}%</strong></td>
      <td><span class="status-badge ${statusClass(s.status)}">${s.status}</span></td>
      <td><span class="status-badge ${feeClass(s.fee)}">${s.fee}</span></td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn-ghost btn-sm" onclick="viewStudent(${s.id})">View</button>
          <button class="btn-primary btn-sm" onclick="showToast('✅ Report generated for ${s.name}','success')">Report</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function statusClass(s) {
  return {Excelling:'badge-purple','On Track':'badge-success','At Risk':'badge-warning','High Risk':'badge-danger'}[s] || 'badge-info';
}
function feeClass(f) {
  return {Paid:'badge-success',Pending:'badge-warning',Overdue:'badge-danger'}[f] || 'badge-info';
}

function filterStudents() {
  const search = document.getElementById('studentSearch').value.toLowerCase();
  const batch  = document.getElementById('batchFilter').value;
  const status = document.getElementById('statusFilter').value;
  filteredStudents = STUDENTS.filter(s =>
    (!search || s.name.toLowerCase().includes(search) || s.roll.toLowerCase().includes(search)) &&
    (!batch  || s.batch === batch) &&
    (!status || s.status === status)
  );
  renderStudentsTable();
}

function viewStudent(id) {
  const s = STUDENTS.find(x => x.id === id);
  if (s) showToast(`📋 Opening profile for ${s.name}`, 'success');
}

function addStudent() {
  const name = document.getElementById('newStudentName').value.trim();
  if (!name) { showToast('Please enter a student name', 'error'); return; }
  showToast(`✅ ${name} added successfully!`, 'success');
  closeModal('studentModal');
}

/* ============ ATTENDANCE ============ */
function renderAttendanceGrid() {
  const grid = document.getElementById('attendanceGrid');
  if (!grid) return;
  grid.innerHTML = STUDENTS.filter(s => s.batch === 'JEE Batch A').map(s => {
    const state = attendanceState[s.id] ?? (s.attend > 75);
    return `
      <div class="attend-student-card ${state ? 'present' : 'absent'}" id="atcard-${s.id}" onclick="toggleAttend(${s.id})">
        <div class="attend-check">${state ? '✓' : '✕'}</div>
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}&backgroundColor=${s.bg}" style="width:32px;height:32px;border-radius:8px" />
        <div style="flex:1;min-width:0">
          <div style="font-size:12.5px;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name}</div>
          <div style="font-size:11px;color:var(--text-muted)">${s.roll}</div>
        </div>
      </div>`;
  }).join('');
}

function toggleAttend(id) {
  attendanceState[id] = !( attendanceState[id] ?? (STUDENTS.find(s=>s.id===id).attend > 75) );
  const card = document.getElementById('atcard-' + id);
  const isPresent = attendanceState[id];
  card.classList.toggle('present', isPresent);
  card.classList.toggle('absent', !isPresent);
  card.querySelector('.attend-check').textContent = isPresent ? '✓' : '✕';
}

function selectAll() {
  STUDENTS.filter(s => s.batch === 'JEE Batch A').forEach(s => { attendanceState[s.id] = true; });
  renderAttendanceGrid();
  showToast('All students marked present', 'success');
}

function saveAttendance() {
  showToast('✅ Attendance saved & parents notified!', 'success');
}

function markAllPresent() {
  showToast('✅ Today\'s attendance marked for all batches!', 'success');
}

function notifyParent(name) {
  showToast(`📱 Parent notification sent for ${name}`, 'success');
}

/* ============ TIMETABLE ============ */
function renderTimetable() {
  const grid = document.getElementById('timetableGrid');
  if (!grid) return;
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const slots = ['8:00–9:30 AM','9:45–11:15 AM','11:30–1:00 PM','2:00–3:30 PM'];
  const data = TT_DATA[currentBatch] || TT_DATA['JEE A'];

  let html = `<table class="tt-table"><thead><tr><th>Time</th>${days.map(d=>`<th>${d}</th>`).join('')}</tr></thead><tbody>`;
  slots.forEach((slot, ri) => {
    html += `<tr><td style="font-size:12px;font-weight:600;color:var(--text-muted);white-space:nowrap;padding:10px 12px;min-width:110px">${slot}</td>`;
    days.forEach((_, ci) => {
      const cell = data[ri]?.[ci] || '--';
      const subject = Object.keys(SLOT_COLORS).find(k => cell.includes(k)) || '--';
      const c = SLOT_COLORS[subject];
      if (cell === '--') {
        html += `<td><div class="tt-class-slot" style="background:transparent;color:var(--text-muted);text-align:center;font-size:12px">—</div></td>`;
      } else {
        const parts = cell.split(' – ');
        html += `<td><div class="tt-class-slot" style="background:${c.bg};color:${c.color}">
          <div style="font-weight:700;font-size:12px">${parts[0]}</div>
          <div style="font-size:11px;opacity:0.8;margin-top:2px">${parts[1] || ''}</div>
        </div></td>`;
      }
    });
    html += '</tr>';
  });
  html += '</tbody></table>';
  grid.innerHTML = html;
}

function selectBatch(btn, batch) {
  document.querySelectorAll('.batch-selector .tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentBatch = batch;
  renderTimetable();
}

function regenerateTimetable() {
  showToast('🤖 AI is regenerating the optimal timetable…', 'success');
  setTimeout(() => showToast('✅ Timetable optimized! Conflicts resolved.', 'success'), 1800);
}

function prevWeek() { showToast('Navigating to previous week…'); }
function nextWeek() { showToast('Navigating to next week…'); }

/* ============ ASSIGNMENTS ============ */
function renderAssignments() {
  const grid = document.getElementById('assignmentsGrid');
  if (!grid) return;
  grid.innerHTML = ASSIGNMENTS.map(a => {
    const pct = Math.round((a.submissions / a.total) * 100);
    const statusColors = { Active:'var(--primary)', 'Due Soon':'var(--warning)', Upcoming:'var(--text-muted)', Completed:'var(--success)' };
    const sc = statusColors[a.status] || 'var(--text-muted)';
    return `
      <div class="assignment-card" style="border-left:4px solid ${a.color}">
        <div class="assign-subject" style="color:${a.color}">${a.subject}</div>
        <div class="assign-title">${a.title}</div>
        <div class="assign-meta">
          <span>📚 ${a.batch}</span>
          <span>👥 ${a.total} students</span>
        </div>
        <div class="progress-bar-wrap" style="margin-bottom:10px">
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${a.color}"></div></div>
          <span class="progress-label" style="color:${a.color}">${pct}%</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span class="assign-due" style="color:${sc}">📅 Due: ${a.due}</span>
          <span class="status-badge ${a.status==='Completed'?'badge-success':a.status==='Due Soon'?'badge-warning':a.status==='Active'?'badge-purple':'badge-info'}">${a.status}</span>
        </div>
        <div style="margin-top:10px;font-size:12px;color:var(--text-muted)">${a.submissions}/${a.total} submitted</div>
      </div>`;
  }).join('');
}

function openAssignmentModal() {
  document.getElementById('assignmentModal').classList.add('open');
}

/* ============ TESTS ============ */
function renderTests() {
  const tbody = document.getElementById('testsTableBody');
  if (!tbody) return;
  tbody.innerHTML = TESTS.map(t => {
    const sc = { Completed:'badge-success', Live:'badge-danger', Scheduled:'badge-info' }[t.status];
    return `
      <tr>
        <td><strong style="color:var(--text-primary)">${t.name}</strong></td>
        <td><span class="status-badge badge-info">${t.batch}</span></td>
        <td>${t.date}</td>
        <td>${t.dur}</td>
        <td>${t.students}</td>
        <td>${t.avg ? `<strong style="color:var(--primary)">${t.avg}%</strong>` : '<span style="color:var(--text-muted)">—</span>'}</td>
        <td><span class="status-badge ${sc}">${t.status === 'Live' ? '🔴 ' : ''}${t.status}</span></td>
        <td>
          <div style="display:flex;gap:6px">
            ${t.status === 'Completed' ? `<button class="btn-ghost btn-sm" onclick="showToast('📊 Report opened for ${t.name}','success')">Results</button>` : ''}
            ${t.status === 'Live' ? `<button class="btn-primary btn-sm" onclick="showToast('🔴 Monitoring ${t.name}…','success')">Monitor</button>` : ''}
            ${t.status === 'Scheduled' ? `<button class="btn-ghost btn-sm" onclick="showToast('✏️ Editing ${t.name}')">Edit</button>` : ''}
          </div>
        </td>
      </tr>`;
  }).join('');
}

function openTestModal() {
  showToast('📝 Test creation panel opening…', 'success');
}

/* ============ ANALYTICS ============ */
function renderAnalytics() {
  renderTopicHeatmap();
  renderTeacherPerfList();
}

function renderTopicHeatmap() {
  const wrap = document.getElementById('topicHeatmap');
  if (!wrap) return;
  const d = TOPIC_HEATMAP_DATA;
  const cols = d.subjects.length;
  wrap.style.gridTemplateColumns = `120px repeat(${cols}, 1fr)`;

  let html = `<div style="font-size:11px;font-weight:700;color:var(--text-muted);padding:8px 0"></div>`;
  d.subjects.forEach(s => {
    html += `<div style="font-size:11px;font-weight:700;text-align:center;padding:6px 0;color:var(--text-secondary)">${s}</div>`;
  });

  d.topics.forEach(t => {
    html += `<div style="font-size:12px;color:var(--text-secondary);padding:6px 0;font-weight:500">${t.name}</div>`;
    t.scores.forEach(score => {
      if (score === null) {
        html += `<div style="margin:3px;border-radius:6px;background:#f8fafc;border:1px solid var(--border)"></div>`;
      } else {
        const h = score > 80 ? '#1d4ed8' : score > 65 ? '#3b82f6' : score > 50 ? '#93c5fd' : '#bfdbfe';
        html += `<div style="margin:3px;border-radius:6px;background:${h};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;padding:8px 4px;cursor:default" title="${t.name}: ${score}%">${score}%</div>`;
      }
    });
  });
  wrap.innerHTML = html;
}

function renderTeacherPerfList() {
  const list = document.getElementById('teacherPerfList');
  if (!list) return;
  list.innerHTML = TEACHERS.slice(0,4).map(t => `
    <div class="teacher-perf-item">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}&backgroundColor=${t.bg}" class="teacher-avatar" style="width:38px;height:38px;border-radius:10px" />
      <div class="teacher-perf-body">
        <strong>${t.name}</strong>
        <p>${t.subject} • ${t.students} students</p>
        <div class="progress-bar-wrap" style="margin-top:4px">
          <div class="progress-bar"><div class="progress-fill" style="width:${t.rating/5*100}%;background:var(--primary)"></div></div>
        </div>
      </div>
      <div class="teacher-rating">${t.rating}</div>
    </div>
  `).join('');
}

/* ============ RECOMMENDATIONS ============ */
function renderRecommendations() {
  const grid = document.getElementById('recommendationsGrid');
  if (!grid) return;
  grid.innerHTML = RECOMMENDATIONS.map(r => `
    <div class="rec-card">
      <div class="rec-header">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${r.seed}&backgroundColor=${r.bg}" class="rec-avatar" style="width:44px;height:44px;border-radius:12px" />
        <div>
          <div class="rec-name">${r.student}</div>
          <div class="rec-batch">${r.batch}</div>
        </div>
        <span class="rec-ai-tag">AI Plan</span>
      </div>
      <div style="margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="font-size:12px;color:var(--text-muted)">Current Score</span>
          <strong style="color:${r.score<70?'var(--danger)':r.score<85?'var(--warning)':'var(--success)'}">${r.score}%</strong>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${r.score}%;background:${r.score<70?'var(--danger)':r.score<85?'var(--warning)':'var(--success)'}"></div></div>
      </div>
      <div class="rec-body">
        <div class="rec-label">⚠️ Weak Topics</div>
        <div style="margin-bottom:12px">${r.weakTopics.map(t=>`<span class="rec-topic">📌 ${t}</span>`).join('')}</div>
        <div class="rec-label">📚 AI Resources</div>
        <div>${r.resources.map(res=>`<div style="font-size:12px;color:var(--text-secondary);padding:4px 0;border-bottom:1px solid rgba(0,0,0,0.04)">→ ${res}</div>`).join('')}</div>
      </div>
      <button class="btn-primary" style="width:100%;margin-top:14px" onclick="showToast('📤 Study plan sent to ${r.student}!','success')">Send to Student</button>
    </div>
  `).join('');
}

/* ============ RANK PREDICTOR ============ */
function renderRankTable() {
  const tbody = document.getElementById('rankTableBody');
  if (!tbody) return;
  tbody.innerHTML = RANK_DATA.map((r, i) => `
    <tr>
      <td>
        <span class="rank-badge" style="display:inline-flex;${i<3?'background:linear-gradient(135deg,'+(i===0?'#f59e0b,#fbbf24':i===1?'#6b7280,#9ca3af':'#d97706,#b45309')+';color:white':''}">${i+1}</span>
      </td>
      <td><strong style="color:var(--text-primary)">${r.student}</strong></td>
      <td><span class="status-badge badge-info">${r.batch}</span></td>
      <td><strong style="color:var(--primary)">${r.score}</strong></td>
      <td><strong style="color:var(--text-primary);font-family:'Space Grotesk',sans-serif">${r.rank}</strong></td>
      <td>
        <div class="progress-bar-wrap">
          <div class="progress-bar"><div class="progress-fill" style="width:${r.conf}%;background:var(--success)"></div></div>
          <span class="progress-label" style="color:var(--success)">${r.conf}%</span>
        </div>
      </td>
    </tr>
  `).join('');
}

function predictRank() {
  const phys = parseInt(document.getElementById('physScore').value) || 0;
  const chem = parseInt(document.getElementById('chemScore').value) || 0;
  const math = parseInt(document.getElementById('mathScore').value) || 0;
  const total = ((phys + chem + math) / 3).toFixed(1);
  const rankNum = Math.max(100, Math.round(10000 - total * 85 + Math.random() * 200));
  const conf = Math.min(97, Math.round(75 + total * 0.2));
  const exam = document.getElementById('rankExam').value;
  const student = document.getElementById('rankStudent').value;

  const resultCard = document.getElementById('rankResult');
  resultCard.innerHTML = `
    <div class="rank-result-display">
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:12px">AI Prediction for <strong>${student}</strong> — ${exam}</div>
      <div class="rank-number">AIR ${rankNum.toLocaleString()}</div>
      <div class="rank-label">Predicted All India Rank</div>
      <div class="rank-score">${total}%</div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">Projected Score</div>
      <div class="rank-conf">✅ ${conf}% AI Confidence</div>
      <div style="margin-top:16px;padding:12px;background:var(--bg);border-radius:10px;font-size:12px;color:var(--text-secondary)">
        💡 <strong>AI Tip:</strong> Improving Chemistry by 5% could move rank by ~${Math.round(rankNum * 0.08).toLocaleString()} positions.
      </div>
    </div>`;
  showToast('🎯 Rank predicted with AI confidence!', 'success');
}

/* ============ FEES ============ */
function renderFees() {
  const tbody = document.getElementById('feesTableBody');
  if (!tbody) return;
  tbody.innerHTML = FEES.map(f => `
    <tr>
      <td><strong style="color:var(--text-primary)">${f.student}</strong></td>
      <td><span class="status-badge badge-info">${f.batch}</span></td>
      <td><strong style="font-family:'Space Grotesk',sans-serif">${f.amount}</strong></td>
      <td>${f.type}</td>
      <td>${f.date}</td>
      <td><span class="status-badge ${feeClass(f.status)}">${f.status}</span></td>
      <td><button class="btn-ghost btn-sm" onclick="showToast('🧾 Receipt downloaded for ${f.student}','success')">Download</button></td>
    </tr>
  `).join('');
}

function openFeeModal() {
  showToast('💳 Fee recording panel opening…', 'success');
}

/* ============ TEACHERS ============ */
function renderTeachers() {
  const grid = document.getElementById('teachersGrid');
  if (!grid) return;
  grid.innerHTML = TEACHERS.map(t => {
    const stars = Array.from({length:5}, (_, i) =>
      `<span class="star${i < Math.floor(t.rating) ? '' : ' empty'}">★</span>`
    ).join('');
    return `
      <div class="teacher-card">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}&backgroundColor=${t.bg}" class="teacher-card-avatar" style="width:72px;height:72px;border-radius:20px;border:3px solid var(--primary);padding:2px" />
        <div class="teacher-card-name">${t.name}</div>
        <div class="teacher-card-subject">${t.subject} Faculty</div>
        <div class="teacher-stats">
          <div class="teacher-stat">
            <div class="teacher-stat-val">${t.students}</div>
            <div class="teacher-stat-label">Students</div>
          </div>
          <div class="teacher-stat">
            <div class="teacher-stat-val">${t.classes}</div>
            <div class="teacher-stat-label">Classes</div>
          </div>
          <div class="teacher-stat">
            <div class="teacher-stat-val">${t.rating}</div>
            <div class="teacher-stat-label">Rating</div>
          </div>
        </div>
        <div class="star-rating">${stars}</div>
        <div style="display:flex;gap:8px;margin-top:14px">
          <button class="btn-ghost btn-sm" style="flex:1" onclick="showToast('📊 Report for ${t.name}','success')">Analytics</button>
          <button class="btn-primary btn-sm" style="flex:1" onclick="showToast('💬 Messaging ${t.name}','success')">Message</button>
        </div>
      </div>`;
  }).join('');
}

function openTeacherModal() {
  showToast('👤 Teacher onboarding panel opening…', 'success');
}

/* ============ PARENTS ============ */
function renderParents() {
  const list = document.getElementById('parentsList');
  if (!list) return;
  list.innerHTML = PARENTS.map((p, i) => `
    <div class="parent-list-item ${i === 0 ? 'active' : ''}" onclick="selectParent(${i})">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${p.seed}&backgroundColor=${p.bg}" style="width:40px;height:40px;border-radius:10px" />
      <div class="parent-list-body">
        <strong>${p.name}</strong>
        <p>Parent of ${p.child} • ${p.batch}</p>
      </div>
      ${p.unread ? '<div class="unread-dot"></div>' : ''}
    </div>
  `).join('');
}

function selectParent(idx) {
  document.querySelectorAll('.parent-list-item').forEach((el, i) => el.classList.toggle('active', i === idx));
  const p = PARENTS[idx];
  const header = document.querySelector('.parent-chat-header');
  if (header) {
    header.querySelector('img').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.seed}&backgroundColor=${p.bg}`;
    header.querySelector('strong').textContent = p.name;
    header.querySelector('p').textContent = `Parent of ${p.child} • ${p.batch}`;
  }
}

function sendBulkMessage() {
  showToast('📢 Bulk message sent to all parents!', 'success');
}

function handleParentMsg(e) {
  if (e.key === 'Enter') sendParentMsg();
}

function sendParentMsg() {
  const input = document.getElementById('parentMsgInput');
  const msg = input.value.trim();
  if (!msg) return;
  const chat = document.getElementById('parentChatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.innerHTML = `<div class="chat-bubble">${msg}</div>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  input.value = '';

  setTimeout(() => {
    const resp = document.createElement('div');
    resp.className = 'chat-msg ai';
    resp.innerHTML = `<div class="chat-bubble">Thank you for the update! We appreciate your prompt response. We'll keep you informed about any developments. 🙏</div>`;
    chat.appendChild(resp);
    chat.scrollTop = chat.scrollHeight;
  }, 1200);
}

/* ============ AI ASSISTANT ============ */
function handleAIInput(e) {
  if (e.key === 'Enter') sendAIMessage();
}

function sendAIMessage() {
  const input = document.getElementById('aiInput');
  const msg = input.value.trim();
  if (!msg) return;
  const chat = document.getElementById('aiChat');

  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user';
  userDiv.innerHTML = `<div class="chat-bubble">${msg}</div><div class="chat-avatar user-av">DM</div>`;
  chat.appendChild(userDiv);
  chat.scrollTop = chat.scrollHeight;
  input.value = '';

  setTimeout(() => {
    const aiDiv = document.createElement('div');
    aiDiv.className = 'chat-msg ai';
    const resp = AI_RESPONSES[aiResponseIndex % AI_RESPONSES.length];
    aiDiv.innerHTML = `<div class="chat-avatar ai-av">AI</div><div class="chat-bubble">${resp}</div>`;
    chat.appendChild(aiDiv);
    chat.scrollTop = chat.scrollHeight;
    aiResponseIndex++;
  }, 900);
}

/* ============ MODALS ============ */
function openStudentModal() {
  document.getElementById('studentModal').classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

/* ============ TOAST ============ */
let toastTimer;
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  const container = document.getElementById('toastContainer');
  container.style.display = 'block';
  toast.textContent = msg;
  toast.className = 'toast' + (type ? ' ' + type : '');
  // Force reflow
  void toast.offsetWidth;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => { container.style.display = 'none'; }, 350);
  }, 3000);
}

/* ============ CHART TABS ============ */
function setChartTab(btn, period) {
  document.querySelectorAll('.card-tabs .tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  showToast(`Showing ${period} performance data`);
}

/* ============ OUTSIDE CLICK ============ */
document.addEventListener('click', e => {
  const panel = document.getElementById('notifPanel');
  const notifBtn = document.getElementById('notifBtn');
  if (panel && !panel.contains(e.target) && !notifBtn.contains(e.target)) {
    panel.classList.remove('open');
  }
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburgerBtn');
  if (window.innerWidth < 900 && sidebar && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  renderHeatmap();
  showPage('dashboard');

  // Subtle entrance animation for KPI cards
  document.querySelectorAll('.kpi-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + i * 80);
  });
});

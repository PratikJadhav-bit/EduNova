-- ================================================
--  EduNova Database Schema
--  Engine: SQLite 3 (compatible with PostgreSQL)
--  Author: EduNova Engineering Team
--  Version: 2.0.0
-- ================================================

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ─────────────────────────────────────────────
-- 1. USERS (Authentication & RBAC)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,
  role          TEXT    NOT NULL CHECK(role IN ('admin','teacher','student','parent')),
  full_name     TEXT    NOT NULL,
  avatar_seed   TEXT,
  is_active     INTEGER NOT NULL DEFAULT 1,
  last_login    DATETIME,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- 2. BATCHES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS batches (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL UNIQUE,
  stream      TEXT    NOT NULL CHECK(stream IN ('JEE','NEET','Foundation')),
  year        INTEGER NOT NULL,
  capacity    INTEGER NOT NULL DEFAULT 40,
  room        TEXT,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- 3. STUDENTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
  roll_number     TEXT    NOT NULL UNIQUE,
  full_name       TEXT    NOT NULL,
  email           TEXT    NOT NULL UNIQUE,
  phone           TEXT,
  date_of_birth   DATE,
  gender          TEXT    CHECK(gender IN ('Male','Female','Other')),
  address         TEXT,
  city            TEXT,
  state           TEXT,
  batch_id        INTEGER NOT NULL REFERENCES batches(id),
  guardian_name   TEXT,
  guardian_phone  TEXT,
  guardian_email  TEXT,
  guardian_rel    TEXT    DEFAULT 'Parent',
  fee_structure   TEXT    DEFAULT 'Standard',
  scholarship_pct INTEGER DEFAULT 0,
  status          TEXT    NOT NULL DEFAULT 'Active'
                  CHECK(status IN ('Active','Inactive','Graduated','Suspended')),
  avatar_seed     TEXT,
  joined_at       DATE    NOT NULL DEFAULT CURRENT_DATE,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- 4. TEACHERS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teachers (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
  employee_id     TEXT    NOT NULL UNIQUE,
  full_name       TEXT    NOT NULL,
  email           TEXT    NOT NULL UNIQUE,
  phone           TEXT,
  subject         TEXT    NOT NULL,
  specialization  TEXT,
  qualification   TEXT,
  experience_yrs  INTEGER DEFAULT 0,
  rating          REAL    DEFAULT 4.5,
  monthly_classes INTEGER DEFAULT 0,
  avatar_seed     TEXT,
  joined_at       DATE    NOT NULL DEFAULT CURRENT_DATE,
  is_active       INTEGER NOT NULL DEFAULT 1,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- 5. ATTENDANCE
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id  INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  batch_id    INTEGER NOT NULL REFERENCES batches(id),
  date        DATE    NOT NULL,
  status      TEXT    NOT NULL DEFAULT 'Present'
              CHECK(status IN ('Present','Absent','Late','Leave')),
  marked_by   INTEGER REFERENCES teachers(id),
  notes       TEXT,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, date)
);

-- ─────────────────────────────────────────────
-- 6. FEES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fees (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id      INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  amount          REAL    NOT NULL,
  fee_type        TEXT    NOT NULL CHECK(fee_type IN ('Tuition','Registration','Lab','Study Material','Exam','Late Fine','Scholarship Deduction')),
  payment_method  TEXT    CHECK(payment_method IN ('Cash','UPI','Card','Bank Transfer','Cheque')),
  transaction_ref TEXT,
  due_date        DATE,
  paid_date       DATE,
  status          TEXT    NOT NULL DEFAULT 'Pending'
                  CHECK(status IN ('Paid','Pending','Overdue','Waived','Partial')),
  notes           TEXT,
  recorded_by     INTEGER REFERENCES users(id),
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- 7. TESTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tests (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  title         TEXT    NOT NULL,
  subject       TEXT    NOT NULL,
  batch_id      INTEGER REFERENCES batches(id),
  total_marks   INTEGER NOT NULL DEFAULT 100,
  duration_min  INTEGER NOT NULL DEFAULT 60,
  test_date     DATE    NOT NULL,
  test_type     TEXT    NOT NULL DEFAULT 'Quiz'
                CHECK(test_type IN ('Quiz','Mock','Full Syllabus','Chapter','Half Yearly','Annual')),
  status        TEXT    NOT NULL DEFAULT 'Scheduled'
                CHECK(status IN ('Scheduled','Live','Completed','Cancelled')),
  instructions  TEXT,
  created_by    INTEGER REFERENCES teachers(id),
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- 8. TEST RESULTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS test_results (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  test_id       INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  student_id    INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  marks_obtained REAL,
  percentage    REAL,
  rank_in_batch INTEGER,
  time_taken    INTEGER,
  attempted     INTEGER DEFAULT 0,
  correct       INTEGER DEFAULT 0,
  wrong         INTEGER DEFAULT 0,
  submitted_at  DATETIME,
  UNIQUE(test_id, student_id)
);

-- ─────────────────────────────────────────────
-- 9. ASSIGNMENTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assignments (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  title         TEXT    NOT NULL,
  subject       TEXT    NOT NULL,
  batch_id      INTEGER REFERENCES batches(id),
  description   TEXT,
  due_date      DATE    NOT NULL,
  total_marks   INTEGER DEFAULT 10,
  created_by    INTEGER REFERENCES teachers(id),
  status        TEXT    NOT NULL DEFAULT 'Active'
                CHECK(status IN ('Active','Completed','Cancelled','Due Soon','Upcoming')),
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- 10. ASSIGNMENT SUBMISSIONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  assignment_id INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id    INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  submitted_at  DATETIME,
  marks_given   REAL,
  feedback      TEXT,
  status        TEXT    NOT NULL DEFAULT 'Pending'
                CHECK(status IN ('Pending','Submitted','Late','Graded')),
  UNIQUE(assignment_id, student_id)
);

-- ─────────────────────────────────────────────
-- 11. PARENT MESSAGES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  from_user   INTEGER NOT NULL REFERENCES users(id),
  to_user     INTEGER NOT NULL REFERENCES users(id),
  student_id  INTEGER REFERENCES students(id),
  subject     TEXT,
  body        TEXT    NOT NULL,
  is_read     INTEGER NOT NULL DEFAULT 0,
  sent_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- 12. AUDIT LOG
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_log (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER REFERENCES users(id),
  action      TEXT    NOT NULL,
  resource    TEXT    NOT NULL,
  resource_id INTEGER,
  details     TEXT,
  ip_address  TEXT,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- INDEXES for performance
-- ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_students_batch    ON students(batch_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date   ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_fees_student      ON fees(student_id);
CREATE INDEX IF NOT EXISTS idx_fees_status       ON fees(status);
CREATE INDEX IF NOT EXISTS idx_test_results_test ON test_results(test_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_user  ON messages(to_user);
CREATE INDEX IF NOT EXISTS idx_audit_log_user    ON audit_log(user_id);

-- ─────────────────────────────────────────────
-- VIEWS for reporting
-- ─────────────────────────────────────────────
CREATE VIEW IF NOT EXISTS v_student_summary AS
SELECT
  s.id,
  s.full_name,
  s.roll_number,
  b.name  AS batch_name,
  b.stream,
  ROUND(
    100.0 * COUNT(CASE WHEN a.status = 'Present' OR a.status = 'Late' THEN 1 END)
    / NULLIF(COUNT(a.id), 0), 1
  ) AS attendance_pct,
  ROUND(AVG(tr.percentage), 1) AS avg_score,
  s.status,
  s.avatar_seed,
  s.guardian_name,
  s.guardian_phone
FROM students s
LEFT JOIN batches b ON s.batch_id = b.id
LEFT JOIN attendance a ON a.student_id = s.id
LEFT JOIN test_results tr ON tr.student_id = s.id
GROUP BY s.id;

CREATE VIEW IF NOT EXISTS v_batch_stats AS
SELECT
  b.id,
  b.name,
  b.stream,
  COUNT(DISTINCT s.id) AS student_count,
  ROUND(
    100.0 * SUM(CASE WHEN a.status='Present' OR a.status='Late' THEN 1 ELSE 0 END)
    / NULLIF(COUNT(a.id), 0), 1
  ) AS avg_attendance,
  ROUND(AVG(tr.percentage), 1) AS avg_score
FROM batches b
LEFT JOIN students s ON s.batch_id = b.id
LEFT JOIN attendance a ON a.student_id = s.id
LEFT JOIN test_results tr ON tr.student_id = s.id
GROUP BY b.id;

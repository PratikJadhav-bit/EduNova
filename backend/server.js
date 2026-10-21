// ================================================
//  EduNova — Express Server (Entry Point)
// ================================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const { initDb } = require('./src/db/database');
const { seed } = require('./src/db/seed');

// Routers
const authRouter      = require('./src/routes/auth');
const studentsRouter  = require('./src/routes/students');
const teachersRouter  = require('./src/routes/teachers');
const batchesRouter   = require('./src/routes/batches');
const attendanceRouter= require('./src/routes/attendance');
const feesRouter      = require('./src/routes/fees');
const testsRouter     = require('./src/routes/tests');
const assignRouter    = require('./src/routes/assignments');
const analyticsRouter = require('./src/routes/analytics');
const aiRouter        = require('./src/routes/ai');
const messagesRouter  = require('./src/routes/messages');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: ['http://localhost:5173','http://localhost:4173'], credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  message: { success: false, message: 'Too many requests' },
}));

// ── Health check ────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '2.0.0' });
});

// ── API Routes ──────────────────────────────────
app.use('/api/auth',        authRouter);
app.use('/api/students',    studentsRouter);
app.use('/api/teachers',    teachersRouter);
app.use('/api/batches',     batchesRouter);
app.use('/api/attendance',  attendanceRouter);
app.use('/api/fees',        feesRouter);
app.use('/api/tests',       testsRouter);
app.use('/api/assignments', assignRouter);
app.use('/api/analytics',   analyticsRouter);
app.use('/api/ai',          aiRouter);
app.use('/api/messages',    messagesRouter);

// ── API Docs endpoint ───────────────────────────
app.get('/api', (req, res) => {
  res.json({
    name: 'EduNova REST API',
    version: '2.0.0',
    endpoints: [
      'POST   /api/auth/login',
      'GET    /api/students?page&limit&search&batch_id&status',
      'GET    /api/students/:id',
      'POST   /api/students',
      'PUT    /api/students/:id',
      'DELETE /api/students/:id',
      'GET    /api/teachers',
      'GET    /api/batches',
      'GET    /api/attendance?batch_id&date',
      'POST   /api/attendance/bulk',
      'GET    /api/fees?student_id&status',
      'POST   /api/fees',
      'GET    /api/tests?batch_id&status',
      'GET    /api/tests/:id/results',
      'GET    /api/assignments?batch_id',
      'GET    /api/analytics/dashboard',
      'GET    /api/analytics/performance',
      'GET    /api/analytics/heatmap',
      'POST   /api/ai/chat',
      'POST   /api/ai/predict-rank',
      'GET    /api/ai/recommendations/:student_id',
    ]
  });
});

// ── 404 handler ─────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

// ── Global error handler ─────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ── Start ───────────────────────────────────────
async function start() {
  try {
    initDb();
    seed();
    app.listen(PORT, () => {
      console.log(`\n🚀 EduNova API running at http://localhost:${PORT}`);
      console.log(`📖 API docs at    http://localhost:${PORT}/api`);
      console.log(`❤️  Health check  http://localhost:${PORT}/health\n`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();

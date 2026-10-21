// ================================================
//  EduNova Backend — Database Connection & Init
// ================================================
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', '..', 'edunova.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

function initDb() {
  const database = getDb();
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
  // Execute each statement separately
  const statements = schema.split(';').map(s => s.trim()).filter(s => s.length > 0);
  for (const stmt of statements) {
    try {
      database.exec(stmt + ';');
    } catch (e) {
      // Ignore "already exists" errors on re-init
      if (!e.message.includes('already exists')) {
        console.error('Schema error:', e.message, '\nStatement:', stmt.slice(0, 60));
      }
    }
  }
  console.log('✅ Database schema initialized');
  return database;
}

module.exports = { getDb, initDb };

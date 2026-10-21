const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');
const { auth } = require('../middleware/auth');
router.get('/', auth, (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM v_batch_stats').all();
  res.json({ success:true, data:rows });
});
module.exports = router;

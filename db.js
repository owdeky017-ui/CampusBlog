const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = process.env.DB_PATH || path.join(__dirname, 'blog.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('[db] failed to open blog.db:', err.message);
    process.exit(1);
  }
});

db.run('PRAGMA foreign_keys = ON');

module.exports = db;

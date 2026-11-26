const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(path.join(__dirname, 'blog.db'), (err) => {
  if (err) {
    console.error('[db] failed to open blog.db:', err.message);
    process.exit(1);
  }
});

db.run('PRAGMA foreign_keys = ON');

module.exports = db;

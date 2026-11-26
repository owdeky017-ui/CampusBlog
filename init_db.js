const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'blog.db');
const schema = fs.readFileSync(path.join(__dirname, 'init_db.sql'), 'utf8');

const db = new sqlite3.Database(dbPath);

db.exec(schema, (err) => {
  if (err) {
    console.error('[init] schema failed:', err.message);
    process.exit(1);
  }

  const seed = `
    INSERT INTO users (username, password, email, bio, role) VALUES
      ('admin', 'admin123', 'admin@campusblog.local', 'Site administrator', 'admin'),
      ('alice', 'password', 'alice@campusblog.local', 'Final year CS student', 'user');
  `;

  db.exec(seed, (err2) => {
    if (err2) {
      console.error('[init] seed failed:', err2.message);
      process.exit(1);
    }
    console.log('[init] database created at', dbPath);
    db.close();
  });
});

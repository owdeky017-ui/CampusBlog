const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = process.env.DB_PATH || path.join(__dirname, 'blog.db');
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

    INSERT INTO posts (user_id, title, content, tags) VALUES
      (1, 'Library Extended Hours for Exam Season', 'The main campus library will stay open until 11:00 PM on weekdays starting next Monday. Quiet study rooms on Floor 3 can be booked at the front desk.', 'campus,library,exams'),
      (2, 'Best Coffee Spots Near Campus for Late Study', 'Tried the new cafe across from the Mayor Street entrance today. Good espresso, plenty of power sockets, and free Wi-Fi for group study sessions.', 'campus-life,coffee,study');
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

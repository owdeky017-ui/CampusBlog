# CampusBlog

Secure Application Programming project — a campus blogging web application built with **Node.js, Express 5, EJS, and SQLite3 (`sqlite3`)** to demonstrate OWASP Top 10:2025 vulnerabilities alongside Defence-in-Depth mitigations.

## Repository Branches

- `main` — Project scaffolding, database schema, setup configuration manual, and documentation.
- `insecure` — Intentionally vulnerable implementation demonstrating SQL Injection, Reflected / Stored / DOM-based XSS, Sensitive Data Exposure, and Broken Access Control.
- `secure` — Planned hardened implementation incorporating parameterised queries, context-aware output encoding, `bcryptjs` password hashing, security headers (CSP), hardened session management, CSRF protection, and security audit logging & monitoring.

## Prerequisites

- **Node.js** v18+ (`node -v`, developed and verified on `v20.20.2`)
- **npm** v9+ (`npm -v`, verified on `v10.8.2`)
- **Git** (`git --version`)
- **OWASP ZAP** *(optional, required only for reproducing DAST security scans)*

## Setup & Running Instructions

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/owdeky017-ui/CampusBlog.git
cd CampusBlog
npm install
```

### 2. Switch to the target branch (optional)

By default you will be on `main` (base skeleton). To inspect or test a specific implementation branch, check it out before initialising the database:

```bash
# For the intentionally vulnerable version:
git checkout insecure

# Or for the hardened version (once implemented):
git checkout secure
```

Optional environment variables (defaults are provided for local development):

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the Express server listens on |
| `SESSION_SECRET` | Local development fallback | Secret used to sign session cookies (planned to be required via `.env` on `secure`) |

### 3. Initialise the SQLite3 database

Run the database initialisation script to create `blog.db` from `init_db.sql` and insert the default seed accounts:

```bash
npm run init-db
```

*(Equivalent to `node init_db.js`. Expected output: `[init] database created at <path>\blog.db`.)*

### 4. Start the application

```bash
npm start
```

The server will start and listen at `http://localhost:3000`.

## Default Accounts

Two seed accounts are created by `init_db.js` for local testing. Initial seed passwords are defined directly inside `init_db.js` and are intentionally omitted from this document:

| Role | Username | Email | Password Storage |
|---|---|---|---|
| `admin` | `admin` | `admin@campusblog.local` | Plaintext in `insecure` (deliberate flaw); planned `bcryptjs` hash in `secure` |
| `user` | `alice` | `alice@campusblog.local` | Plaintext in `insecure` (deliberate flaw); planned `bcryptjs` hash in `secure` |

> Note: Re-running `npm run init-db` resets all tables and restores the default seed accounts.

## Project Structure

```text
CampusBlog/
├── app.js              # Express 5 entry point (middleware & route wiring)
├── db.js               # SQLite3 singleton connection (foreign keys enabled)
├── init_db.sql         # DDL for users, posts, comments, and audit_log tables
├── init_db.js          # Database initialiser and seed data loader
├── routes/             # Feature route handlers (auth, posts, profile, admin — on feature branches)
├── views/              # EJS server-rendered templates (including partials/)
├── public/             # Static assets (style.css and client-side app.js)
├── docs/evidence/      # Screenshots, DAST reports, and assessment evidence
├── .gitignore          # Excludes node_modules, *.db, .env, and logs/
├── package.json        # Dependencies and npm scripts (start, init-db)
└── README.md           # Configuration and setup manual
```

## Security Notice

The `insecure` branch contains **deliberately introduced security vulnerabilities** created strictly for educational demonstration and authorised local testing within the Secure Application Programming module. **Do not deploy this application or its insecure branch to any public or production network.**

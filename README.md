# CampusBlog

Secure Application Programming project — a campus blogging platform built with **Node.js, Express, sqlite3, and EJS** to demonstrate OWASP Top 10 vulnerabilities and Defence-in-Depth mitigations.

## Repository Branches

- `main` — Project scaffolding, database schema, and documentation
- `insecure` — Intentionally vulnerable implementation (SQL Injection, Reflected / Stored / DOM-based XSS, Sensitive Data Exposure)
- `secure` — Hardened implementation with OWASP mitigations, CSRF protection, hardened sessions, security headers, and audit logging

## Prerequisites

- **Node.js** v18+ (`node -v`)
- **npm** v9+ (`npm -v`)
- **Git**

## Setup & Running Instructions

### 1. Clone and install dependencies

```bash
git clone [https://github.com/owdeky017-ui/CampusBlog.git](https://github.com/owdeky017-ui/CampusBlog.git)
cd CampusBlog
npm install
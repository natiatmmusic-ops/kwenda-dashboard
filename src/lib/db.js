import { Pool } from "pg";

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

// Makes sure all tables exist. Safe to call every time —
// it only creates tables if they aren't there already.
export async function ensureSchema() {
  const db = getPool();

  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      email TEXT,
      financial_status TEXT,
      fulfillment_status TEXT,
      currency TEXT,
      subtotal NUMERIC,
      shipping NUMERIC,
      taxes NUMERIC,
      total NUMERIC,
      discount_code TEXT,
      created_at TIMESTAMP,
      imported_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS action_items (
      id SERIAL PRIMARY KEY,
      category TEXT NOT NULL DEFAULT 'Weekly Action Plan',
      title TEXT NOT NULL,
      owner TEXT,
      due_date DATE,
      status TEXT NOT NULL DEFAULT 'Not Started',
      priority TEXT NOT NULL DEFAULT 'Medium',
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function query(text, params) {
  const db = getPool();
  return db.query(text, params);
}

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
}

export async function query(text, params) {
  const db = getPool();
  return db.query(text, params);
}

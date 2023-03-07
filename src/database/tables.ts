import sqlite from 'sqlite3';

export const createInitialTables = async (db: sqlite.Database) => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT NOT NULL,
        password TEXT NOT NULL,
        language TEXT DEFAULT 'eng',
        text_size TEXT DEFAULT 'M',
        is_archived INTEGER NOT NULL DEFAULT 0,
        UNIQUE(user_name)
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER FOREIGN KEY REFERENCES categories(id),
        name TEXT NOT NULL,
        price INTEGER,
        wholesale_price INTEGER,
        is_archived INTEGER NOT NULL DEFAULT 0
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS taxes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        percent INTEGER NOT NULL,
        is_archived INTEGER NOT NULL
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER FOREIGN KEY REFERENCES users(id),
        date TEXT NOT NULL,
        is_whole_sale INTEGER NOT NULL DEFAULT 0
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS sales_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sales_id INTEGER NOT NULL FOREIGN KEY REFERENCES sales(id),
        item_id INTEGER NOT NULL FOREIGN KEY REFERENCES items(id),
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        discount_percent INTEGER DEFAULT 0,
        discount_amount INTEGER DEFAULT 0
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS sales_taxes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sale_item_id INTEGER NOT NULL FOREIGN KEY REFERENCES sales_items(id),
        tax_id INTEGER NOT NULL FOREIGN KEY REFERENCES taxes(id)
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS refunds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sales_id INTEGER FOREIGN KEY REFERENCES sales(id),
        user_id INTEGER FOREIGN KEY REFERENCES users(id),
        date TEXT NOT NULL
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS refunds_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        refund_id INTEGER FOREIGN KEY REFERENCES refunds(id),
        item_id INTEGER NOT NULL FOREIGN KEY REFERENCES items(id),
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS refunds_taxes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        refund_item_id INTEGER NOT NULL FOREIGN KEY REFERENCES refunds_items(id),
        tax_id INTEGER NOT NULL FOREIGN KEY REFERENCES taxes(id)
      )
    `);
  });
};

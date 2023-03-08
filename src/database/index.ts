import { app } from 'electron';
import sqlite from 'sqlite3';

const isPackaged = app.isPackaged;
const sqlite3 = isPackaged ? sqlite : sqlite.verbose();

let db: sqlite.Database;

export const startDatabase = () => {
  db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      console.log('Database connection failed');
      return console.error(err.message);
    }

    console.log('Database connection successful');
  });
};

export const closeDatabase = async () => {
  try {
    await new Promise((resolve, reject) => {
      console.log('Closing the database...');

      db.close((err) => {
        if (err) {
          reject(err.message);
        }
        resolve(console.log('Database closed successfully'));
      });
    });
  } catch (err) {
    console.log('Database closing failed');
    console.error(err);
  }
};

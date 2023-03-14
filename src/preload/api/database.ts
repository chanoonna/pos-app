/* --------------------------------- imports -------------------------------- */
import { app } from 'electron';
import sqlite from 'sqlite3';
import { getAsyncRun, getAsyncGet, getAsyncAll } from './utils';

const isPackaged = app.isPackaged;
const sqlite3 = isPackaged ? sqlite : sqlite.verbose();

let db: sqlite.Database | undefined;

export interface AsyncDB {
  run: ReturnType<typeof getAsyncRun>;
  all: ReturnType<typeof getAsyncAll>;
  get: ReturnType<typeof getAsyncGet>;
}
export const dbAsync: AsyncDB = {} as AsyncDB;

export const connectDatabase = () =>
  new Promise<{ error?: Error }>((resolve) => {
    if (db) {
      resolve({});
      return;
    }

    db = new sqlite3.Database('database.db', (error) => {
      resolve({
        ...(error && { error })
      });
    });
  }).then((response) => {
    if (db) {
      dbAsync.run = getAsyncRun(db);
      dbAsync.get = getAsyncGet(db);
      dbAsync.all = getAsyncAll(db);
    }

    return response;
  });

export const closeDatabase = () =>
  new Promise<{ error?: Error }>((resolve, reject) => {
    if (!db) {
      resolve({});
      return;
    }

    db.close((error) => {
      resolve({ ...(error && { error }) });
    });
  });

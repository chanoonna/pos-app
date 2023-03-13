/* -------------------------------- constants ------------------------------- */
import {
  ERROR_DATABASE_ALREADY_CONNECTED,
  ERROR_DATABASE_NOT_CONNECTED
} from './constants';

/* --------------------------------- imports -------------------------------- */
import { app } from 'electron';
import sqlite from 'sqlite3';
import { getAsyncRun, getAsyncGet } from './utils';

const isPackaged = app.isPackaged;
const sqlite3 = isPackaged ? sqlite : sqlite.verbose();

let db: sqlite.Database | undefined;

export interface AsyncDB {
  run: ReturnType<typeof getAsyncRun>;
  get: ReturnType<typeof getAsyncGet>;
}
export const dbAsync: AsyncDB = {} as AsyncDB;

export const connectDatabase = () =>
  new Promise<{ error?: Error | null }>((resolve) => {
    if (db) {
      resolve({ error: Error(ERROR_DATABASE_ALREADY_CONNECTED) });
      return;
    }

    db = new sqlite3.Database('database.db', (error) => {
      resolve({
        error
      });
    });

    dbAsync.run = getAsyncRun(db);
    dbAsync.get = getAsyncGet(db);
  });

export const closeDatabase = () =>
  new Promise<{ error?: Error | null }>((resolve) => {
    if (!db) {
      resolve({
        error: Error(ERROR_DATABASE_NOT_CONNECTED)
      });
      return;
    }

    db.close((error) => {
      resolve({ error });
    });
  });

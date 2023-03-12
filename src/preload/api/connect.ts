/* --------------------------- types and constants -------------------------- */
import type { AsyncDB, RequestResponse, ExecutionResult } from './types';

import { app } from 'electron';
import sqlite from 'sqlite3';
import { getAsyncRun, getAsyncGet, formatResponse } from './utils';

const isPackaged = app.isPackaged;
const sqlite3 = isPackaged ? sqlite : sqlite.verbose();

let db: sqlite.Database | undefined;

export const dbAsync: AsyncDB = {} as AsyncDB;

export const connectDatabase = () =>
  new Promise<RequestResponse>((resolve, reject) => {
    console.log('Starting the database...');

    if (db) {
      resolve(
        formatResponse({
          log: 'Database already started',
          error: Error('DATABASE_STARTED')
        })
      );
      return;
    }

    const sqlite3db = new sqlite3.Database('database.db', (error) => {
      if (error) {
        resolve(
          formatResponse({
            log: error.message,
            error
          })
        );
        return;
      }

      resolve(
        formatResponse({
          log: 'Database connection successful'
        })
      );
    });

    dbAsync.run = getAsyncRun(sqlite3db);
    dbAsync.get = getAsyncGet(sqlite3db);
  });

export const closeDatabase = () =>
  new Promise<RequestResponse>((resolve, _) => {
    console.log('Closing the database...');

    if (!db) {
      resolve(
        formatResponse({
          log: 'No database connection',
          error: Error('NO_CONNECTION')
        })
      );
      return;
    }

    db.close((error) => {
      if (error) {
        resolve(formatResponse({ log: error.message, error }));
        return;
      }

      resolve(formatResponse({ log: 'Database closed successfully' }));
    });
  });

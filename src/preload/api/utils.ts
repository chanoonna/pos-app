/* ---------------------------------- types --------------------------------- */
import { ExecutionResult, RequestResponse } from './types';

/* -------------------------------- constants ------------------------------- */
import { EXECUTION_RESULT } from './constants';

/* --------------------------------- imports -------------------------------- */
import sqlite from 'sqlite3';

export const formatResponse = <T>(
  execution: ExecutionResult<T>
): RequestResponse<T> => {
  const { log, error, response } = execution;

  if (error) {
    return {
      log: log || error.message,
      result: EXECUTION_RESULT.FAILURE,
      error
    };
  } else {
    return {
      log: log || 'Execution successful',
      result: EXECUTION_RESULT.SUCCESS,
      response
    };
  }
};

export const getAsyncRun =
  (db: sqlite.Database) =>
  async <T>(executionLog: string, query: string, params?: string[]) => {
    const result = await new Promise<RequestResponse<T>>((resolve, reject) => {
      db.run(query, params, (error: Error | null) => {
        if (error) {
          reject(formatResponse({ log: error.message, error }));
          return;
        }

        resolve(
          formatResponse<T>({ log: `${executionLog} executed successfully` })
        );
      });
    });

    return result;
  };

export const getAsyncGet =
  (db: sqlite.Database) =>
  async <T>(executionLog: string, query: string, params?: string[]) => {
    const result = await new Promise<RequestResponse<T>>((resolve, reject) => {
      db.get(query, params, (error: Error | null, row: T) => {
        if (error) {
          reject({
            log: error.message,
            result: EXECUTION_RESULT.FAILURE,
            error
          });
          return;
        }

        resolve({
          log: `${executionLog} executed successfully`,
          result: EXECUTION_RESULT.SUCCESS,
          response: row
        });
      });
    });
    return result;
  };

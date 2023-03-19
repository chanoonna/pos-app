/* ---------------------------------- types --------------------------------- */
import type { DataRequest, Action, QueryResult, SortAttribute } from './types';

/* --------------------------------- imports -------------------------------- */
import { app } from 'electron';
import sqlite, { RunResult } from 'sqlite3';
import chalk from 'chalk';

export const printRequestLog = <T = undefined>({
  action,
  params
}: DataRequest<T>) => {
  if (app.isPackaged) return;

  const actionLog = chalk.yellowBright(`ACTION: ${action}`);
  const paramsLog = `${chalk.cyan('PARAMS:')} ${JSON.stringify(params)}`;

  console.log(actionLog);
  params && console.log(paramsLog);
};

export const printResultLog = <T = undefined>({
  action,
  queryResult,
  error
}: QueryResult<T> & { action: Action }) => {
  if (app.isPackaged) return;

  const errorLog = chalk.red(error?.message);
  const paramsLog = `${chalk.cyan('RESULT:')} ${JSON.stringify(queryResult)}`;
  const actionLog = error
    ? chalk.red(`FAILURE: ${action}`)
    : chalk.green(`SUCCESS ${action}`);

  console.log(actionLog);
  error && console.log(errorLog);
  queryResult && console.log(paramsLog);
};

export const getAsyncRun =
  (db: sqlite.Database) =>
  ({ query, params }: { query: string; params?: (number | string)[] }) =>
    new Promise<{ runResult: RunResult; error?: Error }>((resolve) => {
      db.run(query, params, function (error: Error | null) {
        resolve({ runResult: this, ...(error && { error }) });
      });
    });

export const getAsyncGet =
  (db: sqlite.Database) =>
  <T>({ query, params }: { query: string; params?: (number | string)[] }) =>
    new Promise<{ row?: T; error?: Error }>((resolve) => {
      db.get(query, params, (error: Error | null, row: T) => {
        resolve({
          ...(row && { row }),
          ...(error && { error })
        });
      });
    });

export const getAsyncAll =
  (db: sqlite.Database) =>
  <T>({ query, params }: { query: string; params?: (number | string)[] }) =>
    new Promise<{ rows: T[]; error?: Error }>((resolve) => {
      db.all(query, params, (error: Error | null, rows: T[]) => {
        resolve({
          rows,
          ...(error && { error })
        });
      });
    });

export const handleCatchAndPrintLog = ({
  action,
  error,
  alternateMessage
}: {
  action: Action;
  error: unknown;
  alternateMessage?: string;
}) => {
  if (error instanceof Error) {
    printResultLog({ action, error });

    return error;
  } else {
    const error = new Error(alternateMessage);
    printResultLog({ action, error });

    return error;
  }
};

export const buildSelectQuery = (attributes: string[]) =>
  `SELECT ${attributes.join(', ')}\n`;

export const buildWhereQuery = (wheres: string[]) =>
  `WHERE ${wheres.join(' = ? AND ')} = ?\n`;

export const buildSortQuery = <T>(sortAttributes: SortAttribute<T>) =>
  sortAttributes.reduce((query, [attribute, order]) => {
    const addition = `${attribute} ${order}`;
    return query + (query.length ? ', ' : 'ORDER BY ') + addition;
  }, '') + '\n';

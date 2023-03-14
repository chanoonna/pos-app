/* ---------------------------------- types --------------------------------- */
import type { Method, Route, SortAttribute } from './types';

/* -------------------------------- constants ------------------------------- */
import { ERROR_UNSPECIFIED, SORT_ASC, SORT_DESC } from './constants';

/* --------------------------------- imports -------------------------------- */
import { app } from 'electron';
import sqlite from 'sqlite3';
import chalk from 'chalk';
import isEmpty from 'lodash/isEmpty';

export const printRequestLog = <T = unknown>({
  method,
  route,
  params: _params
}: {
  method?: string;
  route?: string;
  params: { requestAction: string } & T;
}) => {
  if (app.isPackaged) return;

  const { requestAction, ...params } = _params;
  const log =
    `${chalk.yellowBright(`${requestAction}_REQUEST`)}` +
    (method ? `:  ${method}` : '') +
    (route ? ` ${route}` : '');

  console.log(log, isEmpty(params) ? '' : params);
};

export const printResultLog = <ParamType extends { requestAction: string }>({
  method,
  route,
  params,
  error
}: {
  method?: Method;
  route?: Route;
  params: ParamType;
  error?: Error;
}) => {
  if (app.isPackaged) return;

  const action = error
    ? chalk.red(`${params.requestAction}_FAILURE`)
    : chalk.green(`${params.requestAction}_SUCCESS`);
  const log =
    `${chalk.yellowBright(action)}` +
    (method ? `:  ${method}` : '') +
    (route ? ` ${route}` : '') +
    (error ? `\n${error.message}` : '');

  console.log(log);
};

export const getAsyncRun =
  (db: sqlite.Database) =>
  ({ query, params }: { query: string; params?: string[] }) =>
    new Promise<{ error?: Error }>((resolve) => {
      db.run(query, params, (error: Error | null) => {
        resolve({ ...(error && { error }) });
      });
    });

export const getAsyncGet =
  (db: sqlite.Database) =>
  <T>({ query, params }: { query: string; params?: string[] }) =>
    new Promise<{ row?: T; error?: Error }>((resolve) => {
      db.get(query, params, (error: Error | null, row: T) => {
        resolve({
          ...(row && { row }),
          ...(error && { error })
        });
      });
    });

export const handleCatchAndPrintLog = (
  error: unknown,
  requestAction: string
) => {
  if (error instanceof Error) {
    printResultLog({
      params: { requestAction },
      error
    });

    return error;
  } else {
    const error = new Error(ERROR_UNSPECIFIED);
    printResultLog({
      params: { requestAction },
      error
    });

    return error;
  }
};

export const buildSortQuery = <T>(
  params: (T | string)[],
  sortAttributes: SortAttribute<T>
) =>
  sortAttributes.reduce((query, [attribute, order]) => {
    const addition = `? ?`;
    params.push(attribute, order);
    return query + (query.length ? ', ' : '') + addition;
  }, '');

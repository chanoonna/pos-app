/* ---------------------------------- types --------------------------------- */
import type { Method, Route, SortAttribute } from './types';

/* --------------------------------- imports -------------------------------- */
import { app } from 'electron';
import sqlite from 'sqlite3';
import chalk from 'chalk';

interface Request {
  method: Method;
  route: Route;
  params?: any;
}
interface Result {
  response?: any;
  error?: Error;
}

export const printRequestLog = ({ method, route, params }: Request) => {
  if (app.isPackaged) return;

  const routeAndMethodLog = `(${method}) ${route}`;
  const paramsLog = chalk.cyan(JSON.stringify(params));
  const action = chalk.yellowBright(`REQUEST: ${routeAndMethodLog}`);

  console.log(action);
  params && console.log(paramsLog);
};

export const printResultLog = (
  { method, route, params }: Request,
  { response, error }: Result
) => {
  if (app.isPackaged) return;

  const methodAndRouteLog = `(${method}) ${route}`;
  const paramsLog = `${chalk.cyan('PARAMS:')} ${params}`;
  const errorLog = chalk.red(error?.message);

  const action = error
    ? chalk.red(`FAILURE: ${methodAndRouteLog}`)
    : chalk.green(`SUCCESS: ${methodAndRouteLog}`);

  console.log(action);
  params && console.log(paramsLog);
  response && console.log(response);
  error && console.log(errorLog);
};

export const getAsyncRun =
  (db: sqlite.Database) =>
  ({ query, params }: { query: string; params?: (number | string)[] }) =>
    new Promise<{ error?: Error }>((resolve) => {
      db.run(query, params, (error: Error | null) => {
        resolve({ ...(error && { error }) });
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
    new Promise<{ rows?: T; error?: Error }>((resolve) => {
      db.all(query, params, (error: Error | null, rows: T) => {
        resolve({
          ...(rows && { rows }),
          ...(error && { error })
        });
      });
    });

export const handleCatchAndPrintLog = (
  request: Request,
  error: unknown,
  errorMessage?: string
) => {
  if (error instanceof Error) {
    printResultLog(request, { error });

    return error;
  } else {
    const error = new Error(errorMessage);
    printResultLog(request, { error });

    return error;
  }
};

export const buildSortQuery = <T>(sortAttributes: SortAttribute<T>) =>
  sortAttributes.reduce((query, [attribute, order]) => {
    const addition = `${attribute} ${order}`;
    return query + (query.length ? ', ' : 'ORDER BY ') + addition;
  }, '') + '\n';

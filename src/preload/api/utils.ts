/* ---------------------------------- types --------------------------------- */
import { Method, Route } from './types';

/* --------------------------------- imports -------------------------------- */
import sqlite from 'sqlite3';
import chalk from 'chalk';
import isEmpty from 'lodash/isEmpty';

export const printResponseLog = <
  BodyType extends { requestAction: string },
  ErrorType = unknown
>({
  method,
  route,
  body,
  error
}: {
  method?: Method;
  route?: Route;
  body: BodyType;
  error?: ErrorType;
}) => {
  const action = error
    ? chalk.red(`${body.requestAction}_FAILURE`)
    : chalk.green(`${body.requestAction}_SUCCESS`);
  const log =
    `${chalk.yellowBright(action)}` +
    (method ? `:  ${method}` : '') +
    (route ? ` ${route}` : '');

  console.log(log);
};
export const printRequestLog = <T = unknown>({
  method,
  route,
  body: _body
}: {
  method?: string;
  route?: string;
  body: { requestAction: string } & T;
}) => {
  const { requestAction, ...body } = _body;
  const log =
    `${chalk.yellowBright(`${requestAction}_REQUEST`)}` +
    (method ? `:  ${method}` : '') +
    (route ? ` ${route}` : '');

  console.log(log, isEmpty(body) ? '' : body);
};

export const getAsyncRun =
  (db: sqlite.Database) =>
  async ({ query, params }: { query: string; params?: string[] }) =>
    new Promise<{
      error?: Error | null;
    }>((resolve) => {
      db.run(query, params, (error: Error | null) => {
        resolve({ error });
      });
    });

export const getAsyncGet =
  (db: sqlite.Database) =>
  async <RowType>({ query, params }: { query: string; params?: string[] }) =>
    new Promise<{
      row?: RowType;
      error?: Error;
    }>((resolve) => {
      db.get(query, params, (error: Error | null, row: RowType) => {
        resolve({
          row,
          ...(error && { error })
        });
      });
    });

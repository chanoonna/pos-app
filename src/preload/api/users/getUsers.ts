/* ---------------------------------- types --------------------------------- */
import type { GetUsersParams, User } from './types';

/* -------------------------------- constants ------------------------------- */
import { USERS, COLUMN } from '../tablesAndColumns';

/* --------------------------------- imports -------------------------------- */
import { printRequestLog, buildWhereQuery, printResultLog } from '../utils';
import { dbAsync } from '../database';

export const getUsers = async (
  params: GetUsersParams
): Promise<{ result: User[]; error?: Error }> => {
  const ACTION = 'getUsers';

  printRequestLog({ action: ACTION, params });

  const whereColums = Object.keys(params);
  const getQuery = `SELECT ${COLUMN[USERS].id},
    ${COLUMN[USERS].username},
    ${COLUMN[USERS].last_login},
    ${COLUMN[USERS].is_archived},
    ${COLUMN[USERS].access_level}
    FROM ${USERS}
    ${buildWhereQuery(whereColums)};`;

  const { rows, error } = await dbAsync.all<User>({
    query: getQuery,
    params: Object.values(params)
  });

  printResultLog({ action: ACTION, queryResult: rows, error });

  return {
    result: rows,
    error
  };
};

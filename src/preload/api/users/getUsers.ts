/* ---------------------------------- types --------------------------------- */
import type { GetUsersParams, UserDB } from './types';
import type { QueryResult } from '../types';

/* -------------------------------- constants ------------------------------- */
import { USERS, COLUMN } from '../tablesAndColumns';
import { ERROR_UNSPECIFIED } from '../constants';

/* --------------------------------- imports -------------------------------- */
import {
  handleCatchAndPrintLog,
  printRequestLog,
  printResultLog,
  buildSelectQuery,
  buildWhereQuery
} from '../utils';
import { dbAsync } from '../database';

export const getUsers = async ({
  params,
  pickOnly = ['id', 'username', 'last_login', 'is_archived', 'access_level']
}: {
  params: GetUsersParams;
  pickOnly?: (keyof UserDB)[];
}): Promise<QueryResult<UserDB[]>> => {
  const ACTION = 'getUsers';

  printRequestLog({ action: ACTION, params });

  const whereColums = Object.keys(params);
  const getQuery = `${buildSelectQuery(pickOnly)}
    FROM ${USERS}
    ${buildWhereQuery(whereColums)};`;

  const { rows, error } = await dbAsync.all<UserDB>({
    query: getQuery,
    params: Object.values(params)
  });

  printResultLog({ action: ACTION, queryResult: rows, error });

  return {
    queryResult: rows,
    error
  };
};

export const getLastLoggedInUser = async (): Promise<
  QueryResult<UserDB | undefined>
> => {
  const ACTION = 'getLastLoggedInUser';
  printRequestLog({ action: ACTION });

  const query = `SELECT ${COLUMN[USERS].id},
      ${COLUMN[USERS].username},
      ${COLUMN[USERS].last_login},
      ${COLUMN[USERS].access_level},
      ${COLUMN[USERS].language},
      ${COLUMN[USERS].ui_size},
      ${COLUMN[USERS].color_theme}
    FROM ${USERS}
    WHERE ${COLUMN[USERS].is_archived} != 1 
      AND ${COLUMN[USERS].last_login} IS NOT NULL
    ORDER BY ${COLUMN[USERS].last_login} DESC
    LIMIT 1;`;

  try {
    const { row, error } = await dbAsync.get<UserDB>({
      query
    });

    printResultLog({ action: ACTION, queryResult: row, error });
    return {
      queryResult: row,
      error: error
    };
  } catch (error) {
    const userFriendlyError = `${ERROR_UNSPECIFIED} while getting previous logged in user.`;
    return {
      error: handleCatchAndPrintLog({
        action: ACTION,
        error,
        alternateMessage: userFriendlyError
      }),
      userFriendlyError
    };
  }
};

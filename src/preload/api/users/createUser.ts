/* ---------------------------------- types --------------------------------- */
import type { QueryResult } from '../types';
import type { CreateUserParams, User } from './types';

/* -------------------------------- constants ------------------------------- */
import { USERS, COLUMN } from '../tablesAndColumns';
import { ERROR_UNSPECIFIED } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { dbAsync } from '../database';
import {
  handleCatchAndPrintLog,
  printRequestLog,
  printResultLog
} from '../utils';
import { getUsers } from './getUsers';

export const createUser = async (
  params: CreateUserParams
): Promise<QueryResult<User[] | undefined>> => {
  const ACTION = 'createUser';

  const postQuery = `INSERT INTO ${USERS} (
    ${COLUMN[USERS].username},
    ${COLUMN[USERS].password},
    ${COLUMN[USERS].language},
    ${COLUMN[USERS].ui_size},
    ${COLUMN[USERS].color_theme},
    ${COLUMN[USERS].access_level})
  VALUES (?, ?, ?, ?, ?, ?);`;
  const postParams = [
    params.username,
    params.password,
    params.language,
    params.ui_size,
    params.color_theme,
    params.access_level
  ];

  try {
    printRequestLog<CreateUserParams>({ action: ACTION, params });
    const {
      runResult: { lastID },
      error
    } = await dbAsync.run({
      query: postQuery,
      params: postParams
    });

    printResultLog({ action: ACTION, error });

    if (!error) {
      const { queryResult, error } = await getUsers({
        params: { id: lastID },
        pickOnly: [
          COLUMN[USERS].id,
          COLUMN[USERS].username,
          COLUMN[USERS].last_login,
          COLUMN[USERS].is_archived,
          COLUMN[USERS].access_level,
          COLUMN[USERS].language,
          COLUMN[USERS].ui_size,
          COLUMN[USERS].color_theme
        ]
      });
      return { queryResult, error };
    }
    return { error };
  } catch (error) {
    const userFriendlyError = `${ERROR_UNSPECIFIED} while creating a user.`;
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

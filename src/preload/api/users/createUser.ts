/* ---------------------------------- types --------------------------------- */
import type { RequestResult } from '../types';
import type { CreateUserParams, UserDB } from './types';

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

export const createUser = async ({
  params
}: {
  params: CreateUserParams;
}): Promise<RequestResult<UserDB[] | undefined>> => {
  const ACTION = 'createUser';

  const postQuery = `INSERT INTO ${USERS} (
    ${COLUMN[USERS].username},
    ${COLUMN[USERS].password},
    ${COLUMN[USERS].access_level})
  VALUES (?, ?, ?);`;
  const postParams = [params.username, params.password, params.access_level];

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
      const { result, error } = await getUsers({
        params: { id: lastID },
        pickOnly: [
          COLUMN[USERS].id,
          COLUMN[USERS].username,
          COLUMN[USERS].last_login,
          COLUMN[USERS].is_archived,
          COLUMN[USERS].access_level
        ]
      });
      return { result, error };
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

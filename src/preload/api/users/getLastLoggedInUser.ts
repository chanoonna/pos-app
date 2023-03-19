import type { QueryResult } from '../types';
import type { User } from './types';

/* -------------------------------- constants ------------------------------- */
import { COLUMN, USERS } from '../tablesAndColumns';

/* --------------------------------- imports -------------------------------- */
import {
  handleCatchAndPrintLog,
  printRequestLog,
  printResultLog
} from '../utils';
import { dbAsync } from '../database';
import { ERROR_UNSPECIFIED } from '../constants';

export const getLastLoggedInUser = async (): Promise<
  QueryResult<User | undefined>
> => {
  const ACTION = 'getLastLoggedInUser';
  printRequestLog({ action: ACTION });

  const query = `SELECT * FROM ${USERS}
    WHERE ${COLUMN[USERS].is_archived} != 1
    ORDER BY ${COLUMN[USERS].last_login} DESC
    LIMIT 1;`;

  try {
    const { row, error } = await dbAsync.get<User>({
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

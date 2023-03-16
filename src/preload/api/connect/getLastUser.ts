import type { DataRequest } from '../types';

/* -------------------------------- constants ------------------------------- */
import { DB_GET_LAST_USER } from './constants';
import { COLUMN, LAST_USER, USERS } from '../tablesAndColumns';

/* --------------------------------- imports -------------------------------- */
import {
  handleCatchAndPrintLog,
  printRequestLog,
  printResultLog
} from '../utils';
import { dbAsync } from '../database';
import { ERROR_UNSPECIFIED } from '../constants';

export interface LastUser {
  username: string;
  user_id: number;
  date: string;
  language: string;
  access_level: number;
}

export const getLastUser = async (
  request: DataRequest
): Promise<{
  lastUser?: LastUser;
  error?: Error;
  userFriendlyError?: string;
}> => {
  printRequestLog(request);

  const query = `SELECT ${USERS}.${COLUMN[USERS].id},
    ${USERS}.${COLUMN[USERS].username},
    ${LAST_USER}.${COLUMN[LAST_USER].date},
    ${USERS}.${COLUMN[USERS].language},
    ${USERS}.${COLUMN[USERS].access_level}
    FROM ${LAST_USER}
    JOIN ${USERS} ON ${LAST_USER}.${COLUMN[LAST_USER].user_id} = ${USERS}.${COLUMN[USERS].id}`;

  try {
    const { row, error } = await dbAsync.get<LastUser>({
      query
    });

    printResultLog(request, { response: row, error });
    return {
      lastUser: row,
      error: error
    };
  } catch (error) {
    const userFriendlyError = `${ERROR_UNSPECIFIED} while getting previous loggedin user.`;
    return {
      error: handleCatchAndPrintLog(request, {
        error,
        errorMessage: userFriendlyError
      }),
      userFriendlyError
    };
  }
};

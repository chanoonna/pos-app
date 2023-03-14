/* -------------------------------- constants ------------------------------- */
import { DB_GET_LAST_USER } from './constants';
import { COLUMN, LAST_USER, USERS } from '../tablesAndColumns';

/* --------------------------------- imports -------------------------------- */
import { handleCatchAndPrintLog } from '../utils';
import { dbAsync } from '../database';

export interface LastLoggedUser {
  username: string;
  user_id: number;
  date: string;
  language: string;
  access_level: number;
}

export const getLastUser = async (): Promise<{
  lastLoggedUser?: LastLoggedUser;
  error?: Error;
  userFriendlyError?: string;
}> => {
  const query = `SELECT ${USERS}.${COLUMN[USERS].id},
    ${USERS}.${COLUMN[USERS].username},
    ${LAST_USER}.${COLUMN[LAST_USER].date},
    ${USERS}.${COLUMN[USERS].language},
    ${USERS}.${COLUMN[USERS].access_level}
    FROM ${LAST_USER}
    JOIN ${USERS} ON ${LAST_USER}.${COLUMN[LAST_USER].user_id} = ${USERS}.${COLUMN[USERS].id}`;

  try {
    const result = await dbAsync.get<LastLoggedUser>({
      query
    });

    return {
      lastLoggedUser: result.row,
      error: result.error
    };
  } catch (error) {
    return {
      error: handleCatchAndPrintLog(error, DB_GET_LAST_USER),
      userFriendlyError: `Error while getting previous loggedin user.`
    };
  }
};

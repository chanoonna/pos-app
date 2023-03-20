/* ---------------------------------- types --------------------------------- */
import type { LoginParams, UserDB } from './types';
import type { RequestResult } from '../types';

/* -------------------------------- constants ------------------------------- */
import { USERS, COLUMN } from '../tablesAndColumns';

/* --------------------------------- imports -------------------------------- */
import { printRequestLog, printResultLog } from '../utils';
import { dbAsync } from '../database';
import omit from 'lodash/omit';

export const login = async ({
  params
}: {
  params: LoginParams;
}): Promise<RequestResult<UserDB | undefined>> => {
  const ACTION = 'login';

  printRequestLog({ action: ACTION, params });

  const query = `SELECT ${COLUMN[USERS].id},
      ${COLUMN[USERS].username},
      ${COLUMN[USERS].password},
      ${COLUMN[USERS].is_archived},
      ${COLUMN[USERS].access_level},
      ${COLUMN[USERS].last_login}
    FROM ${USERS}
    WHERE ${COLUMN[USERS].username} = ?;`;

  const { row, error } = await dbAsync.get<UserDB>({
    query,
    params: [params.username]
  });

  if (error) {
    printResultLog({ action: ACTION, result: row, error });
    return {
      userFriendlyError: 'Error while processing login'
    };
  } else if (!row) {
    const error = new Error(`No user found with username: ${params.username}}`);
    printResultLog({ action: ACTION, result: row, error });

    return {
      userFriendlyError: error.message
    };
  } else if (row.password !== params.password) {
    const error = new Error('Incorrect password');
    printResultLog({ action: ACTION, result: row, error });

    return {
      userFriendlyError: error.message
    };
  } else if (row.is_archived === 1) {
    const error = new Error(`User ${params.username} is archived`);
    printResultLog({ action: ACTION, result: row, error });

    return {
      userFriendlyError: error.message
    };
  } else {
    const passwordOmittedRow = omit(row, 'password');

    const now = new Date();
    const isoDateTime = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString();
    const date = isoDateTime.replace(/T|\.(\d{3})Z/g, ' ').trim();

    await dbAsync.run({
      query: `UPDATE ${USERS}
        SET ${COLUMN[USERS].last_login} = ?
        WHERE ${COLUMN[USERS].id} = ?;`,
      params: [date, row.id]
    });

    printResultLog({
      action: ACTION,
      result: { ...passwordOmittedRow, last_login: date },
      error
    });

    return {
      result: {
        ...passwordOmittedRow,
        last_login: date
      }
    };
  }
};

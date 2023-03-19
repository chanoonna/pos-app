/* ---------------------------------- types --------------------------------- */
import type { LoginParams, UserDB } from './types';
import type { QueryResult } from '../types';

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
}): Promise<QueryResult<UserDB | undefined>> => {
  const ACTION = 'login';

  printRequestLog({ action: ACTION, params });

  const query = `SELECT ${COLUMN[USERS].id},
      ${COLUMN[USERS].username},
      ${COLUMN[USERS].password},
      ${COLUMN[USERS].language},
      ${COLUMN[USERS].ui_size},
      ${COLUMN[USERS].color_theme},
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
    printResultLog({ action: ACTION, queryResult: row, error });
    return {
      userFriendlyError: 'Error while processing login'
    };
  } else if (!row) {
    const error = new Error(`No user found with username: ${params.username}}`);
    printResultLog({ action: ACTION, queryResult: row, error });

    return {
      userFriendlyError: error.message
    };
  } else if (row.password !== params.password) {
    const error = new Error('Incorrect password');
    printResultLog({ action: ACTION, queryResult: row, error });

    return {
      userFriendlyError: error.message
    };
  } else if (row.is_archived === 1) {
    const error = new Error(`User ${params.username} is archived`);
    printResultLog({ action: ACTION, queryResult: row, error });

    return {
      userFriendlyError: error.message
    };
  } else {
    const passwordOmittedRow = omit(row, 'password');
    printResultLog({ action: ACTION, queryResult: row, error });

    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await dbAsync.run({
      query: `UPDATE ${USERS}
        SET ${COLUMN[USERS].last_login} = ?
        WHERE ${COLUMN[USERS].id} = ?;`,
      params: [date, row.id]
    });

    return {
      queryResult: passwordOmittedRow
    };
  }
};

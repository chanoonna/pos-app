/* ---------------------------------- types --------------------------------- */
import type { RequestResult } from '../types';
import type { CreateUserParamsDB, UpdateUserParamsDB, UserDB } from './types';

/* -------------------------------- constants ------------------------------- */
import { USERS, COLUMN } from '../tablesAndColumns';
import { ERROR_UNSPECIFIED } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { dbAsync } from '../database';
import {
  buildSetQuery,
  buildValueQuery,
  buildWhereQuery,
  handleCatchAndPrintLog,
  printRequestLog,
  printResultLog
} from '../utils';
import { getUsers } from './getUsers';
import omit from 'lodash/omit';

export const updateUser = async ({
  params: _params
}: {
  params: UpdateUserParamsDB;
}): Promise<RequestResult<UserDB[] | undefined>> => {
  const ACTION = 'updateUser';

  const params = omit(_params, 'id');
  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);
  const putQuery = `UPDATE ${USERS}
    ${buildSetQuery(paramKeys)}
    ${buildValueQuery(paramKeys)}
    ${buildWhereQuery(['id'])}`;

  try {
    printRequestLog<UpdateUserParamsDB>({ action: ACTION, params: _params });
    const {
      runResult: { lastID },
      error
    } = await dbAsync.run({
      query: putQuery,
      params: [...paramValues, _params.id]
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
    const userFriendlyError = `${ERROR_UNSPECIFIED} while updating a user.`;
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

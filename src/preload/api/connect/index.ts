import type { DataRequest } from '../types';

/* -------------------------------- constants ------------------------------- */
import { ERROR_TABLE_CHECK_FAIL, ERROR_TABLE_CREATION_FAIL } from './constants';
import { ERROR_UNSPECIFIED, ROUTE } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { connectDatabase } from '../database';
import { checkTables } from './checkTables';
import { createTables } from './createTables';
import {
  handleCatchAndPrintLog,
  printRequestLog,
  printResultLog
} from '../utils';
import { getLastUser, LastUser } from './getLastUser';
import { Table } from './types';

export const handleConnect = async (
  request: DataRequest
): Promise<{
  error?: Error;
  userFriendlyError?: string;
  lastUser?: LastUser;
}> => {
  printRequestLog(request);

  try {
    /* --------------------------- database connection -------------------------- */
    const { error: connectionError } = await connectDatabase();

    if (connectionError) {
      throw new Error(connectionError.message);
    }

    /* ----------------------------- checking tables ---------------------------- */
    const { uncreatedTables, tableCheckErrors } = await checkTables({
      method: 'GET',
      route: ROUTE.CHECK_TABLES,
      params: undefined
    });

    if (tableCheckErrors.length) {
      throw new Error(
        `${ERROR_TABLE_CHECK_FAIL}: ${tableCheckErrors.join(', ')}`
      );
    }

    const creationFailedTables = uncreatedTables.length
      ? await createTables({
          method: 'GET',
          route: ROUTE.CREATE_TABLES,
          params: { uncreatedTables }
        })
      : ([] as Table[]);

    if (creationFailedTables.length) {
      throw new Error(
        `${ERROR_TABLE_CREATION_FAIL}: ${creationFailedTables.join(', ')}`
      );
    }

    const lastUserResult = await getLastUser({
      method: 'GET',
      route: ROUTE.LAST_USER
    });

    if (lastUserResult.error) {
      throw new Error(lastUserResult.error.message);
    }

    const response = {
      lastUser: lastUserResult.lastUser
    };

    printResultLog(request, { response });

    return response;
  } catch (error) {
    return {
      error: handleCatchAndPrintLog(request, error),
      userFriendlyError: `${ERROR_UNSPECIFIED} while starting databse.`
    };
  }
};

import type { DataRequest, QueryResult } from '../types';

/* -------------------------------- constants ------------------------------- */
import { ERROR_TABLE_CHECK_FAIL, ERROR_TABLE_CREATION_FAIL } from './constants';
import { ERROR_UNSPECIFIED } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { connectDatabase } from '../database';
import { checkTables } from './checkTables';
import { createTables } from './createTables';
import { getLastLoggedInUser } from '../users';
import {
  handleCatchAndPrintLog,
  printRequestLog,
  printResultLog
} from '../utils';
import { Table } from './types';
import { User } from '../users/types';

export const connect = async (): Promise<QueryResult<User | undefined>> => {
  const ACTION = 'connect';
  printRequestLog({ action: ACTION });

  try {
    /* --------------------------- database connection -------------------------- */
    const { error: connectionError } = await connectDatabase();

    if (connectionError) {
      throw new Error(connectionError.message);
    }

    /* ----------------------------- checking tables ---------------------------- */
    const { uncreatedTables, tableCheckErrors } = await checkTables();

    if (tableCheckErrors.length) {
      throw new Error(
        `${ERROR_TABLE_CHECK_FAIL}: ${tableCheckErrors.join(', ')}`
      );
    }

    const creationFailedTables = uncreatedTables.length
      ? await createTables(uncreatedTables)
      : ([] as Table[]);

    if (creationFailedTables.length) {
      throw new Error(
        `${ERROR_TABLE_CREATION_FAIL}: ${creationFailedTables.join(', ')}`
      );
    }

    const lastUserResult = await getLastLoggedInUser();

    if (lastUserResult.error) {
      throw new Error(lastUserResult.error.message);
    }

    printResultLog<User | undefined>({
      action: ACTION,
      queryResult: lastUserResult.queryResult,
      error: lastUserResult.error
    });

    return { queryResult: lastUserResult.queryResult };
  } catch (error) {
    const userFriendlyError = `${ERROR_UNSPECIFIED} while starting databse.`;
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

/* -------------------------------- constants ------------------------------- */
import {
  ERROR_TABLE_CHECK_FAIL,
  ERROR_TABLE_CREATION_FAIL,
  DB_CONNECT
} from './constants';
import { ERROR_UNSPECIFIED } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { connectDatabase } from '../database';
import { checkTables } from './checkTables';
import { createTables } from './createTables';
import {
  handleCatchAndPrintLog,
  printRequestLog,
  printResultLog
} from '../utils';
import { getLastUser, LastLoggedUser } from './getLastUser';

export const handleConnect = async (): Promise<{
  error?: Error;
  userFriendlyError?: string;
  lastLoggedUser?: LastLoggedUser;
}> => {
  printRequestLog({ params: { requestAction: DB_CONNECT } });

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
      : [];

    if (creationFailedTables.length) {
      throw new Error(
        `${ERROR_TABLE_CREATION_FAIL}: ${creationFailedTables.join(', ')}`
      );
    }

    const lastUserResult = await getLastUser();

    if (lastUserResult.error) {
      throw new Error(lastUserResult.error.message);
    }

    printResultLog({ params: { requestAction: DB_CONNECT } });

    return {
      lastLoggedUser: lastUserResult.lastLoggedUser
    };
  } catch (error) {
    return {
      error: handleCatchAndPrintLog(error, DB_CONNECT),
      userFriendlyError: `${ERROR_UNSPECIFIED} while setting up.`
    };
  }
};

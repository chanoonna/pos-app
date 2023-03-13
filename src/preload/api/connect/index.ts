/* -------------------------------- constants ------------------------------- */
import {
  ERROR_TABLE_CHECK_FAIL,
  ERROR_TABLE_CREATION_FAIL,
  USER_FRIENDLY_ERROR_CONNECTION_FAILED
} from './constants';
import { DB_CONNECT, ERROR_UNSPECIFIED } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { connectDatabase } from '../database';
import { checkTables } from './checkTables';
import { createTables } from './createTables';
import {
  handleCatchAndPrintLog,
  printRequestLog,
  printResultLog
} from '../utils';

export const handleConnect = async (): Promise<{
  error?: Error;
  userFriendlyError?: string;
  isDatabaseReady?: boolean;
}> => {
  printRequestLog({ body: { requestAction: DB_CONNECT } });

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
      throw {
        message: ERROR_TABLE_CREATION_FAIL,
        tables: creationFailedTables
      };
    }

    printResultLog({ body: { requestAction: DB_CONNECT } });

    return {
      isDatabaseReady: !creationFailedTables.length
    };
  } catch (error) {
    return {
      error: handleCatchAndPrintLog(error, DB_CONNECT),
      userFriendlyError: `${ERROR_UNSPECIFIED} while settingup databse and tables.`
    };
  }
};

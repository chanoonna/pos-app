/* ---------------------------------- types --------------------------------- */
import type { Table } from './types';

/* -------------------------------- constants ------------------------------- */
import { TABLES } from '../tablesAndColumns';
import { DB_CREATE_TABLES } from './constants';

/* --------------------------------- imports -------------------------------- */
import { dbAsync } from '../database';
import {
  printRequestLog,
  printResultLog,
  handleCatchAndPrintLog
} from '../utils';

export const checkTables = async (): Promise<{
  uncreatedTables: Table[];
  tableCheckErrors: Table[];
}> => {
  const tableCheckErrors: Table[] = [];
  const uncreatedTables: Table[] = [];

  for await (const tableName of TABLES) {
    const query = `SELECT name FROM sqlite_master WHERE type='table' AND name = ?`;
    const requestAction = `${DB_CREATE_TABLES}_${tableName}`;

    try {
      printRequestLog({ params: { requestAction } });
      const { rows, error } = await dbAsync.all<{ name: Table }>({
        query,
        params: [tableName]
      });

      if (!rows) {
        uncreatedTables.push(tableName);
      }
      if (error) {
        tableCheckErrors.push(tableName);
      }

      printResultLog({ params: { requestAction }, error });
    } catch (error) {
      handleCatchAndPrintLog(error, requestAction);
    }
  }

  return {
    uncreatedTables,
    tableCheckErrors
  };
};

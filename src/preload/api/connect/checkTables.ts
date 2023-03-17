/* ---------------------------------- types --------------------------------- */
import type { DataRequest } from '../types';
import type { Table } from './types';

/* -------------------------------- constants ------------------------------- */
import { TABLES } from '../tablesAndColumns';

/* --------------------------------- imports -------------------------------- */
import { dbAsync } from '../database';
import {
  printRequestLog,
  printResultLog,
  handleCatchAndPrintLog
} from '../utils';

export const checkTables = async (
  request: DataRequest<any>
): Promise<{
  uncreatedTables: Table[];
  tableCheckErrors: Table[];
}> => {
  const tableCheckErrors: Table[] = [];
  const uncreatedTables: Table[] = [];

  for await (const tableName of TABLES) {
    const query = `SELECT name FROM sqlite_master WHERE type='table' AND name = ?`;

    try {
      printRequestLog(request);
      const { row, error } = await dbAsync.get<{ name: Table }>({
        query,
        params: [tableName]
      });

      if (!row) {
        uncreatedTables.push(tableName);
      }
      if (error) {
        tableCheckErrors.push(tableName);
      }

      printResultLog(request, { response: row, error });
    } catch (error) {
      handleCatchAndPrintLog(request, error);
    }
  }

  return {
    uncreatedTables,
    tableCheckErrors
  };
};

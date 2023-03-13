/* ---------------------------------- types --------------------------------- */
import type { Table } from './types';

/* -------------------------------- constants ------------------------------- */
import {
  USERS,
  CATEGORIES,
  ITEMS,
  TAXES,
  SALES,
  SALE_ITEMS,
  SALE_TAXES,
  TAGS,
  REFUNDS,
  REFUND_ITEMS,
  REFUND_TAXES
} from '../tablesAndColumns';
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

  for await (const tableName of tables) {
    const query = `SELECT name FROM sqlite_master WHERE type='table' AND name = ?`;
    const requestAction = `${DB_CREATE_TABLES}_${tableName}`;

    try {
      printRequestLog({ params: { requestAction } });
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

const tables = [
  USERS,
  CATEGORIES,
  ITEMS,
  TAXES,
  SALES,
  SALE_ITEMS,
  SALE_TAXES,
  TAGS,
  REFUNDS,
  REFUND_ITEMS,
  REFUND_TAXES
];

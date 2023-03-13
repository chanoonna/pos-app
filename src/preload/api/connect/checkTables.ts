/* ---------------------------------- types --------------------------------- */
import type { Table } from './types';

/* -------------------------------- constants ------------------------------- */
import {
  TABLE_USERS,
  TABLE_CATEGORIES,
  TABLE_ITEMS,
  TABLE_TAXES,
  TABLE_SALES,
  TABLE_SALE_ITEMS,
  TABLE_SALE_TAXES,
  TABLE_TAGS,
  TABLE_REFUNDS,
  TABLE_REFUND_ITEMS,
  TABLE_REFUND_TAXES,
  ERROR_UNSPECIFIED
} from '../constants';
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
      printRequestLog({ body: { requestAction } });
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

      printResultLog({ body: { requestAction }, error });
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
  TABLE_USERS,
  TABLE_CATEGORIES,
  TABLE_ITEMS,
  TABLE_TAXES,
  TABLE_SALES,
  TABLE_SALE_ITEMS,
  TABLE_SALE_TAXES,
  TABLE_TAGS,
  TABLE_REFUNDS,
  TABLE_REFUND_ITEMS,
  TABLE_REFUND_TAXES
];

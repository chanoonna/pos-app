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
  CHECK_TABLE_EXISTENCE,
  ERROR_TABLE_CHECK_ERROR
} from '../../constants';

/* --------------------------------- imports -------------------------------- */
import { dbAsync } from '../../database';
import { printRequestLog, printResponseLog } from '../../utils';

export const checkTables = async (): Promise<{
  error?: Error | null;
}> => {
  const errornousTables: string[] = [];
  const tablesNotCreated: string[] = [];

  for await (const tableName of tables) {
    const query = `SELECT name FROM sqlite_master WHERE type='table' AND name = ?`;
    const requestAction = `${CHECK_TABLE_EXISTENCE}_${tableName}`;
    printRequestLog({ body: { requestAction } });

    const result = await dbAsync.get({
      query,
      params: [tableName]
    });

    if (result.error) {
      errornousTables.push(tableName);
    }
    if (!result.row) {
      tablesNotCreated.push(tableName);
    }

    printResponseLog({ body: { requestAction }, ...result });
  }

  const error = errornousTables.length
    ? Error(`${ERROR_TABLE_CHECK_ERROR}: ${errornousTables.join(', ')}`)
    : undefined;
  const response = { tablesNotCreated };

  return {
    ...(!error && { response }),
    ...(error && { error })
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

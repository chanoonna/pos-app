/* -------------------------------- constants ------------------------------- */
import {
  CREATE_TABLES,
  TABLE_CREATION_FAILED,
  UNSPECIFIED_ERROR
} from '../constants';

/* --------------------------------- imports -------------------------------- */
import {
  usersTableSchema,
  categoriesSchema,
  itemsSchema,
  taxesSchema,
  salesSchema,
  saleItemsSchema,
  saleTaxesSchema,
  tagsSchema,
  refundsSchema,
  refundItemsSchema,
  refundTaxesSchema
} from './schemas';
import { printRequestLog, printResponseLog } from '../utils';
import { dbAsync } from '../connect';

const schema = {
  users: usersTableSchema,
  categories: categoriesSchema,
  items: itemsSchema,
  taxes: taxesSchema,
  sales: salesSchema,
  saleItems: saleItemsSchema,
  saleTaxes: saleTaxesSchema,
  tags: tagsSchema,
  refunds: refundsSchema,
  refundItems: refundItemsSchema,
  refundTaxes: refundTaxesSchema
};

export const createDatabaseTables = async (): Promise<{
  error?: Error | null;
}> => {
  const creationFailedTables: string[] = [];

  for await (const [tableName, tableSchema] of Object.entries(schema)) {
    const requestAction = `${CREATE_TABLES}_${tableName}`;
    printRequestLog({ body: { requestAction } });
    let result;

    try {
      result = await dbAsync.run({
        query: tableSchema
      });

      if (result.error) {
        creationFailedTables.push(tableName);
      }
    } catch (error) {
      if (error instanceof Error) {
        result = { error };
      } else {
        result = { error: new Error(UNSPECIFIED_ERROR) };
      }
    }

    printResponseLog({ body: { requestAction }, ...result });
  }

  return {
    ...(creationFailedTables.length && {
      error: Error(
        `${TABLE_CREATION_FAILED}: ${creationFailedTables.join(', ')}`
      )
    })
  };
};

/* ---------------------------------- types --------------------------------- */
import type { AsyncDB } from '../connect';

/* -------------------------------- constants ------------------------------- */
import {
  CREATE_TABLES,
  TABLE_CREATION_FAILED,
  UNSPECIFIED_ERROR
} from '../constants';

/* --------------------------------- imports -------------------------------- */
import chalk from 'chalk';

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

export const createDatabaseTables = async (
  dbAsync: AsyncDB
): Promise<{ error?: Error | null }> => {
  const creationFailedTables: string[] = [];

  for await (const [tableName, tableSchema] of Object.entries(schema)) {
    console.log(chalk.yellowBright(`Creating table ${tableName}...`));
    const requestAction = `${CREATE_TABLES}_REQUEST(${tableName})`;

    try {
      const result = await dbAsync.run({
        query: tableSchema
      });

      if ('error' in result) {
        creationFailedTables.push(tableName);
      }
    } catch (error) {
      if (error instanceof Error) {
        return { error };
      } else {
        return { error: new Error(UNSPECIFIED_ERROR) };
      }
    }
  }

  return {
    ...(creationFailedTables.length && {
      error: Error(
        `${TABLE_CREATION_FAILED}: ${creationFailedTables.join(', ')}`
      )
    })
  };
};

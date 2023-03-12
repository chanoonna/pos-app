/* ---------------------------------- types --------------------------------- */
import type { AsyncDB, RequestResponse } from '../types';

/* -------------------------------- importsç -------------------------------- */
import { formatResponse } from '../utils';

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

export const createInitialTables = async <T>(
  dbAsync: AsyncDB
): Promise<RequestResponse<T>> => {
  const creationFailedTables: string[] = [];

  for await (const [tableName, tableSchema] of Object.entries(schema)) {
    const executionLog = `CREATE_TABLE ${tableName}`;
    console.log(`Creating table ${tableName}...`);
    try {
      const result = await dbAsync.run<string>(executionLog, tableSchema);

      if ('error' in result) {
        creationFailedTables.push(tableName);
      }
    } catch (error) {
      if (error instanceof Error) {
        return formatResponse({ error });
      }
    }
  }

  return formatResponse({
    log: creationFailedTables.length
      ? 'Tables created with errors'
      : 'Tables created successfully',
    ...(creationFailedTables.length && {
      error: Error(
        `Tables failed to create: ${creationFailedTables.join(', ')}`
      )
    })
  });
};

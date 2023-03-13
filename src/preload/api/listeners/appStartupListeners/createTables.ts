/* -------------------------------- constants ------------------------------- */
import {
  CREATE_TABLES,
  ERROR_TABLE_CREATION_FAILED,
  ERROR_UNSPECIFIED,
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
} from '../../constants';

/* --------------------------------- imports -------------------------------- */
import { printRequestLog, printResponseLog } from '../../utils';
import { dbAsync } from '../../database';

export const createTables = async (): Promise<{
  error?: Error | null;
}> => {
  const creationFailedTables: string[] = [];

  for await (const [tableName, tableSchema] of Object.entries(query)) {
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
        result = { error: new Error(ERROR_UNSPECIFIED) };
      }
    }

    printResponseLog({ body: { requestAction }, ...result });
  }

  return {
    ...(creationFailedTables.length && {
      error: Error(
        `${ERROR_TABLE_CREATION_FAILED}: ${creationFailedTables.join(', ')}`
      )
    })
  };
};

const query = {
  usersTable: `
    CREATE TABLE ${TABLE_USERS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL,
      password TEXT NOT NULL,
      language TEXT DEFAULT 'eng',
      text_size TEXT DEFAULT 'M',
      is_archived INTEGER NOT NULL DEFAULT 0,
      UNIQUE(user_name)
    )
`,
  categories: `
    CREATE TABLE ${TABLE_CATEGORIES} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
`,
  items: `
    CREATE TABLE ${TABLE_ITEMS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      name TEXT NOT NULL,
      price INTEGER,
      wholesale_price INTEGER,
      is_archived INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(category_id) REFERENCES categories(id)
    )
`,
  taxes: `
    CREATE TABLE ${TABLE_TAXES} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      percent INTEGER NOT NULL,
      is_archived INTEGER NOT NULL
    )
`,
  sales: `
    CREATE TABLE ${TABLE_SALES} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      date TEXT NOT NULL,
      is_whole_sale INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
`,
  saleItems: `
    CREATE TABLE ${TABLE_SALE_ITEMS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sales_id INTEGER NOT NULL,
      item_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price INTEGER NOT NULL,
      discount_percent INTEGER DEFAULT 0,
      discount_amount INTEGER DEFAULT 0,
      FOREIGN KEY(sales_id) REFERENCES sales(id),
      FOREIGN KEY(item_id) REFERENCES items(id)
    )
`,
  saleTaxes: `
    CREATE TABLE ${TABLE_SALE_TAXES} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sale_item_id INTEGER NOT NULL,
      tax_id INTEGER NOT NULL,
      FOREIGN KEY(sale_item_id) REFERENCES sale_items(id),
      FOREIGN KEY(tax_id) REFERENCES taxes(id)
    )
`,
  tags: `
    CREATE TABLE ${TABLE_TAGS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
`,
  refunds: `
    CREATE TABLE ${TABLE_REFUNDS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sales_id INTEGER,
      user_id INTEGER,
      date TEXT NOT NULL,
      FOREIGN KEY(sales_id) REFERENCES sales(id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
`,
  refundItems: `
    CREATE TABLE ${TABLE_REFUND_ITEMS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      refund_id INTEGER,
      item_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price INTEGER NOT NULL,
      FOREIGN KEY(refund_id) REFERENCES refunds(id),
      FOREIGN KEY(item_id) REFERENCES items(id)
    )
`,
  refundTaxes: `
    CREATE TABLE ${TABLE_REFUND_TAXES} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      refund_item_id INTEGER NOT NULL,
      tax_id INTEGER NOT NULL,
      FOREIGN KEY(refund_item_id) REFERENCES refund_items(id),
      FOREIGN KEY(tax_id) REFERENCES taxes(id)
    )
`
};

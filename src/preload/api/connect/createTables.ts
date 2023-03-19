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
  REFUND_TAXES,
  COLUMN
} from '../tablesAndColumns';
import { ERROR_UNSPECIFIED } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { dbAsync } from '../database';
import {
  handleCatchAndPrintLog,
  printRequestLog,
  printResultLog
} from '../utils';

export const createTables = async (
  uncreatedTables: Table[]
): Promise<Table[]> => {
  const ACTION = 'createTables';
  const creationFailedTables: Table[] = [];

  for await (const tableName of uncreatedTables) {
    printRequestLog({ action: ACTION, params: { tableName } });

    const query = tableCreationQuery[tableName];

    try {
      const { error } = await dbAsync.run({
        query
      });

      if (error) {
        creationFailedTables.push(tableName);
      }
      printResultLog({ action: ACTION, error });
    } catch (error) {
      handleCatchAndPrintLog({
        action: ACTION,
        error,
        alternateMessage: `${ERROR_UNSPECIFIED} while creating tables.`
      });
    }
  }

  return creationFailedTables;
};

const tableCreationQuery = {
  [USERS]: `
    CREATE TABLE ${USERS} (
      ${COLUMN[USERS].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[USERS].username} TEXT NOT NULL,
      ${COLUMN[USERS].password} TEXT NOT NULL,
      ${COLUMN[USERS].language} TEXT DEFAULT 'eng',
      ${COLUMN[USERS].ui_size} TEXT DEFAULT 'large',
      ${COLUMN[USERS].color_theme} TEXT DEFAULT 'default',
      ${COLUMN[USERS].is_archived} INTEGER NOT NULL DEFAULT 0,
      ${COLUMN[USERS].access_level} INTEGER NOT NULL DEFAULT 3,
      ${COLUMN[USERS].last_login} TEXT,
      UNIQUE(${COLUMN[USERS].username})
    )
`,
  [CATEGORIES]: `
    CREATE TABLE ${CATEGORIES} (
      ${COLUMN[CATEGORIES].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[CATEGORIES].name} TEXT NOT NULL
    )
`,
  [ITEMS]: `
    CREATE TABLE ${ITEMS} (
      ${COLUMN[ITEMS].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[ITEMS].category_id} INTEGER,
      ${COLUMN[ITEMS].name} TEXT NOT NULL,
      ${COLUMN[ITEMS].price} INTEGER,
      ${COLUMN[ITEMS].wholesale_price} INTEGER,
      ${COLUMN[ITEMS].is_archived} INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(${COLUMN[ITEMS].category_id}) REFERENCES ${CATEGORIES}(${COLUMN[CATEGORIES].id})
    )
`,
  [TAXES]: `
    CREATE TABLE ${TAXES} (
      ${COLUMN[TAXES].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[TAXES].name} TEXT NOT NULL,
      ${COLUMN[TAXES].percent} INTEGER NOT NULL,
      ${COLUMN[TAXES].is_archived} INTEGER NOT NULL
    )
`,
  [SALES]: `
    CREATE TABLE ${SALES} (
      ${COLUMN[SALES].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[SALES].user_id} INTEGER,
      ${COLUMN[SALES].date} TEXT NOT NULL,
      ${COLUMN[SALES].is_whole_sale} INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(${COLUMN[SALES].user_id}) REFERENCES ${USERS}(${COLUMN[USERS].id})
    )
`,
  [SALE_ITEMS]: `
    CREATE TABLE ${SALE_ITEMS} (
      ${COLUMN[SALE_ITEMS].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[SALE_ITEMS].sales_id} INTEGER NOT NULL,
      ${COLUMN[SALE_ITEMS].item_id} INTEGER NOT NULL,
      ${COLUMN[SALE_ITEMS].quantity} INTEGER NOT NULL,
      ${COLUMN[SALE_ITEMS].price} INTEGER NOT NULL,
      ${COLUMN[SALE_ITEMS].discount_percent} INTEGER DEFAULT 0,
      ${COLUMN[SALE_ITEMS].discount_amount} INTEGER DEFAULT 0,
      FOREIGN KEY(${COLUMN[SALE_ITEMS].sales_id}) REFERENCES ${SALES}(${COLUMN[SALES].id}),
      FOREIGN KEY(${COLUMN[SALE_ITEMS].item_id}) REFERENCES ${ITEMS}(${COLUMN[ITEMS].id})
    )
`,
  [SALE_TAXES]: `
    CREATE TABLE ${SALE_TAXES} (
      ${COLUMN[SALE_TAXES].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[SALE_TAXES].sale_item_id} INTEGER NOT NULL,
      ${COLUMN[SALE_TAXES].tax_id} INTEGER NOT NULL,
      FOREIGN KEY(${COLUMN[SALE_TAXES].sale_item_id}) REFERENCES ${SALE_ITEMS}(${COLUMN[SALE_ITEMS].id}),
      FOREIGN KEY(${COLUMN[SALE_TAXES].tax_id}) REFERENCES ${TAXES}(${COLUMN[TAXES].id})
    )
`,
  [TAGS]: `
    CREATE TABLE ${TAGS} (
      ${COLUMN[TAGS].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[TAGS].name} TEXT NOT NULL
    )
`,
  [REFUNDS]: `
    CREATE TABLE ${REFUNDS} (
      ${COLUMN[REFUNDS].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[REFUNDS].sales_id} INTEGER,
      ${COLUMN[REFUNDS].user_id} INTEGER,
      ${COLUMN[REFUNDS].date} TEXT NOT NULL,
      FOREIGN KEY(${COLUMN[REFUNDS].sales_id}) REFERENCES ${SALES}(${COLUMN[SALES].id}),
      FOREIGN KEY(${COLUMN[REFUNDS].user_id}) REFERENCES ${USERS}(${COLUMN[USERS].id})
    )
`,
  [REFUND_ITEMS]: `
    CREATE TABLE ${REFUND_ITEMS} (
      ${COLUMN[REFUND_ITEMS].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[REFUND_ITEMS].refund_id} INTEGER,
      ${COLUMN[REFUND_ITEMS].item_id} INTEGER NOT NULL,
      ${COLUMN[REFUND_ITEMS].quantity} INTEGER NOT NULL,
      ${COLUMN[REFUND_ITEMS].price} INTEGER NOT NULL,
      FOREIGN KEY(${COLUMN[REFUND_ITEMS].refund_id}) REFERENCES ${REFUNDS}(${COLUMN[REFUNDS].id}),
      FOREIGN KEY(${COLUMN[REFUND_ITEMS].item_id}) REFERENCES ${ITEMS}(${COLUMN[ITEMS].id})
    )
`,
  [REFUND_TAXES]: `
    CREATE TABLE ${REFUND_TAXES} (
      ${COLUMN[REFUND_TAXES].id} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${COLUMN[REFUND_TAXES].refund_item_id} INTEGER NOT NULL,
      ${COLUMN[REFUND_TAXES].tax_id} INTEGER NOT NULL,
      FOREIGN KEY(${COLUMN[REFUND_TAXES].refund_item_id}) REFERENCES ${REFUND_ITEMS}(${COLUMN[REFUND_ITEMS].id}),
      FOREIGN KEY(${COLUMN[REFUND_TAXES].tax_id}) REFERENCES ${TAXES}(${COLUMN[TAXES].id})
    )
`
};

export const API_RESPONSE_CHANNEL = {
  DB_INITIALIZATION: 'DB_INITIALIZATION',
  DB_AUTHENTICATION: 'DB_AUTHENTICATION',
  DB_USERS: 'DB_USERS',
  DB_SALES: 'DB_SALES',
  DB_SALE_ITEMS: 'DB_SALE_ITEMS',
  DB_TAXES: 'DB_TAXES',
  DB_SALE_TAXES: 'DB_SALE_TAXES',
  DB_REFUNDS: 'DB_REFUNDS',
  DB_REFUND_ITEMS: 'DB_REFUND_ITEMS',
  DB_REFUND_TAXES: 'DB_REFUND_TAXES',
  DB_CATEGORIES: 'DB_CATEGORIES',
  DB_ITEMS: 'DB_ITEMS',
  DB_TAGS: 'DB_TAGS'
} as const;

export const TABLE_USERS = 'users';
export const TABLE_CATEGORIES = 'categories';
export const TABLE_ITEMS = 'items';
export const TABLE_TAXES = 'taxes';
export const TABLE_SALES = 'sales';
export const TABLE_SALE_ITEMS = 'sale_items';
export const TABLE_SALE_TAXES = 'sale_taxes';
export const TABLE_TAGS = 'tags';
export const TABLE_REFUNDS = 'refunds';
export const TABLE_REFUND_ITEMS = 'refund_items';
export const TABLE_REFUND_TAXES = 'refund_taxes';

export const API_MAIN = 'API_MAIN' as const;
export const API_STARTUP = 'API_STARTUP' as const;

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const;

export const ROUTE = {
  AUTHENTICATION: '/db/authentication',
  USERS: '/db/users',
  SALES: '/db/sales',
  SALE_ITEMS: '/db/sale_items',
  TAXES: '/db/taxes',
  SALE_TAXES: '/db/sale_taxes',
  REFUNDS: '/db/refunds',
  REFUND_ITEMS: '/db/refund_items',
  REFUND_TAXES: '/db/refund_taxes',
  CATEGORIES: '/db/categories',
  ITEMS: '/db/items',
  TAGS: '/db/tags'
} as const;

export const REQUEST_RESULT = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
} as const;

/* ------------------------------ Base requests ----------------------------- */
export const CONNECT_DB = 'CONNECT_DB';
export const CLOSE_DB = 'CLOSE_DB';
export const CREATE_TABLES = 'CREATE_TABLES';
export const REGISTER_ADMIN = 'REGISTER_ADMIN';
export const CHECK_TABLE_EXISTENCE = 'CHECK_TABLE_EXISTENCE';

/* ------------------------------- Base errors ------------------------------ */
export const ERROR_UNSPECIFIED = 'ERROR_UNSPECIFIED';

/* ----------------------------- DB init related ---------------------------- */
export const ERROR_DATABASE_ALREADY_CONNECTED = 'DATABASE_ALREADY_CONNECTED';
export const ERROR_DATABASE_NOT_CONNECTED = 'DATABASE_NOT_CONNECTED';
export const ERROR_TABLE_CREATION_FAILED = 'TABLE_CREATION_FAILED';
export const ERROR_TABLE_ALREADY_EXISTS = 'TABLE_ALREADY_EXISTS';
export const ERROR_TABLE_DOES_NOT_EXIST = 'TABLE_DOES_NOT_EXIST';
export const ERROR_TABLE_CHECK_ERROR = 'TABLE_CHECK_ERROR';

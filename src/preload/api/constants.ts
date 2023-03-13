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

export const API_MAIN = 'API_MAIN' as const;
export const API_CONNECT = 'API_CONNECT' as const;

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

/* ------------------------------- Base errors ------------------------------ */
export const UNSPECIFIED_ERROR = 'UNSPECIFIED_ERROR';

/* ----------------------------- DB init related ---------------------------- */
export const DATABASE_ALREADY_CONNECTED = 'DATABASE_ALREADY_CONNECTED';
export const DATABASE_NOT_CONNECTED = 'DATABASE_NOT_CONNECTED';
export const TABLE_CREATION_FAILED = 'TABLE_CREATION_FAILED';

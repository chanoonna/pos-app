export const API_RESPONSE_CHANNEL = {
  DB_STARTUP: 'DB_STARTUP',
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

export const API = 'API' as const;
export const API_STARTUP = 'API_STARTUP' as const;

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const;

export const ROUTE = {
  CONNECT: '/connect',
  LOGIN_ACTIVITIES: '/login_activities',
  AUTHENTICATION: '/authentication',
  USERS: '/users',
  SALES: '/sales',
  SALE_ITEMS: '/sale_items',
  TAXES: '/taxes',
  SALE_TAXES: '/sale_taxes',
  REFUNDS: '/refunds',
  REFUND_ITEMS: '/refund_items',
  REFUND_TAXES: '/refund_taxes',
  CATEGORIES: '/categories',
  ITEMS: '/items',
  TAGS: '/tags'
} as const;

export const REQUEST_RESULT = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
} as const;

/* ------------------------------ Base requests ----------------------------- */
export const DB_CONNECT = 'DB_CONNECT';
export const DB_CLOSE = 'DB_CLOSE';

/* ------------------------------- Base errors ------------------------------ */
export const ERROR_UNSPECIFIED = 'ERROR_UNSPECIFIED';

/* ----------------------------- DB init related ---------------------------- */
export const ERROR_DATABASE_ALREADY_CONNECTED = 'DATABASE_ALREADY_CONNECTED';
export const ERROR_DATABASE_NOT_CONNECTED = 'DATABASE_NOT_CONNECTED';
export const ERROR_TABLE_CREATION_FAILED = 'TABLE_CREATION_FAILED';
export const ERROR_TABLE_ALREADY_EXISTS = 'TABLE_ALREADY_EXISTS';
export const ERROR_TABLE_DOES_NOT_EXIST = 'TABLE_DOES_NOT_EXIST';
export const ERROR_TABLE_CHECK_ERROR = 'TABLE_CHECK_ERROR';

/* ----------------------------- Params related ----------------------------- */
export const SORT_DESC = 'SORT_DESC' as const;
export const SORT_ASC = 'SORT_ASC' as const;

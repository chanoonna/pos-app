export const API_CHANNEL = {
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

export const API_MAIN = 'DATABASE_MAIN' as const;

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const;

export const ROUTE = {
  INITIALIZATION: '/initialization',
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

export const EXECUTION_RESULT = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
} as const;

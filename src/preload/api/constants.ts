export const API = 'API' as const;

export const REQUEST_RESULT = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
} as const;

/* ------------------------------- Base errors ------------------------------ */
export const ERROR_UNSPECIFIED = 'Unspecified error';

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

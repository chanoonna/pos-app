/* -------------------------------- constants ------------------------------- */
import { DB_CONNECT } from 'preload/api/constants';
import { DB_REGISTER_ADMIN } from 'preload/api/connect/constants';

/* --------------------------------- imports -------------------------------- */
import { createRequestTypeMap } from '../utils';

export const DB_CONNECT_ACTION = createRequestTypeMap(DB_CONNECT);
export const DB_REGISTER_ADMIN_ACTION = createRequestTypeMap(DB_REGISTER_ADMIN);

export const APP_STARTUP_REQUEST = {
  [DB_CONNECT]: DB_CONNECT_ACTION,
  [DB_REGISTER_ADMIN]: DB_REGISTER_ADMIN_ACTION
} as const;

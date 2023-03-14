/* -------------------------------- constants ------------------------------- */
import { DB_CONNECT } from 'preload/api/connect/constants';

/* --------------------------------- imports -------------------------------- */
import { createRequestTypeMap } from '../utils';

export const APP_STARTUP_STATUS = {
  ERROR: 'ERROR',
  INITIAL_STATUS: 'INITIAL_STATUS',
  CONNECTING_DB: 'CONNECTING_DB',
  SETTING_LANGUAGE: 'SETTING_LANGUAGE',
  REGISTERING_ADMIN: 'REGISTERING_ADMIN',
  SETTING_OPTIONS: 'SETTING_OPTIONS',
  NOTIFICATION: 'NOTIFICATION',
  REDIRECTING_TO_LOGIN: 'REDIRECTING_TO_LOGIN'
} as const;

export const DB_CONNECT_ACTION = createRequestTypeMap(DB_CONNECT);

export const APP_STARTUP_REQUEST = {
  [DB_CONNECT]: DB_CONNECT_ACTION
} as const;

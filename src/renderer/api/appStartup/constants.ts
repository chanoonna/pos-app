/* -------------------------------- constants ------------------------------- */
import { DB_CONNECT } from 'preload/api/connect/constants';

/* --------------------------------- imports -------------------------------- */
import { createRequestActionMap } from '../utils';

export const DB_CONNECT_ACTION = createRequestActionMap(DB_CONNECT);

export const APP_STARTUP_REQUEST = {
  [DB_CONNECT]: DB_CONNECT_ACTION
} as const;

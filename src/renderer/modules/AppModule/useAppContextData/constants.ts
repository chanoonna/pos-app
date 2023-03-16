/* -------------------------------- constants ------------------------------- */
import { DB_CONNECT } from 'preload/api/connect/constants';

/* --------------------------------- imports -------------------------------- */
import { createRequestActionMap } from 'api/utils';

export const CONNECT = createRequestActionMap(DB_CONNECT);
export const NAVIGATE_TO = 'NAVIGATE_TO' as const;
export const LOGOUT = 'LOGOUT' as const;

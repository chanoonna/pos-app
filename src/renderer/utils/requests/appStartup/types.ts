/* -------------------------------- constants ------------------------------- */
import { DB_CONNECT } from 'preload/api/connect/constants';
import { DB_CONNECT_ACTION, APP_STARTUP_STATUS } from './constants';

/* -------------------------- Initialization State -------------------------- */

export interface AppStartupState {
  status: keyof typeof APP_STARTUP_STATUS;
  error?: Error;
}

/* ---------------------- Initialization Request Action --------------------- */
export type ConnectDatabaseRequest = typeof DB_CONNECT;

/* ----------------------- Initialization Action Types ---------------------- */

type ConnectDatabaseRequestActionType =
  (typeof DB_CONNECT_ACTION)[keyof typeof DB_CONNECT_ACTION];

/* ------------------------- Initialization Actions ------------------------- */
interface ConnectDatabaseRequestAction {
  type: ConnectDatabaseRequestActionType;
  payload?: {
    error?: Error;
    response?: {
      isFirstStartup: boolean;
    };
  };
}

export type AppStartupRequestAction = ConnectDatabaseRequestAction;

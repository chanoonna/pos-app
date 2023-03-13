/* -------------------------------- constants ------------------------------- */
import { DB_CONNECT } from 'preload/api/constants';
import { DB_REGISTER_ADMIN } from 'preload/api/connect/constants';
import { DB_CONNECT_ACTION, DB_REGISTER_ADMIN_ACTION } from './constants';

/* -------------------------- Initialization State -------------------------- */

export interface AppStartupState {
  isDatabaseConnected: boolean;
  isDatabaseConnecting: boolean;
  isDatabaseConnectionFailed: boolean;
  isDatabaseReady: boolean;
  isAdminRegistered: boolean;
  isAdminRegistering: boolean;
  isAdminRegistrationFailed: boolean;
}

/* ---------------------- Initialization Request Action --------------------- */
export type ConnectDatabaseRequest =
  | typeof DB_CONNECT
  | typeof DB_REGISTER_ADMIN;

/* ----------------------- Initialization Action Types ---------------------- */

type ConnectDatabaseRequestActionType =
  (typeof DB_CONNECT_ACTION)[keyof typeof DB_CONNECT_ACTION];
type RegisterAdminRequestActionType =
  (typeof DB_REGISTER_ADMIN_ACTION)[keyof typeof DB_REGISTER_ADMIN_ACTION];

/* ------------------------- Initialization Actions ------------------------- */

interface ConnectDatabaseRequestAction {
  type: ConnectDatabaseRequestActionType;
  payload?: {
    error?: Error;
    response?: {
      isDatabaseReady: boolean;
    };
  };
}

interface RegisterAdminRequestAction {
  type: RegisterAdminRequestActionType;
  payload?: {
    error?: Error;
    response?: any;
  };
}

export type AppStartupRequestAction =
  | ConnectDatabaseRequestAction
  | RegisterAdminRequestAction;

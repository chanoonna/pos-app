import {
  CONNECT_DB_ACTION,
  CLOSE_DB_ACTION,
  CREATE_TABLES_ACTION,
  REGISTER_ADMIN_ACTION,
  CHECK_TABLE_EXISTENCE_ACTION
} from './constants';
/* -------------------------------- constants ------------------------------- */
import {
  CONNECT_DB,
  CLOSE_DB,
  CREATE_TABLES,
  REGISTER_ADMIN,
  CHECK_TABLE_EXISTENCE
} from 'preload/api/constants';

/* -------------------------- Initialization State -------------------------- */

export interface InitializationState {
  isDatabaseConnected: boolean;
  isDatabaseConnecting: boolean;
  isDatabaseConnectionFailed: boolean;
  isTablesCreated: boolean;
  isTablesCreating: boolean;
  isTableCreationFailed: boolean;
  isAdminRegistered: boolean;
  isAdminRegistering: boolean;
  isAdminRegistrationFailed: boolean;
}

/* ---------------------- Initialization Request Action --------------------- */
export type ConnectDatabaseRequest =
  | typeof CONNECT_DB
  | typeof CLOSE_DB
  | typeof CHECK_TABLE_EXISTENCE
  | typeof CREATE_TABLES
  | typeof REGISTER_ADMIN;

/* ----------------------- Initialization Action Types ---------------------- */

type ConnectDatabaseRequestActionType =
  (typeof CONNECT_DB_ACTION)[keyof typeof CONNECT_DB_ACTION];
type CloseDatabaseRequestActionType =
  (typeof CLOSE_DB_ACTION)[keyof typeof CLOSE_DB_ACTION];
type CheckTableExistenceRequestActionType =
  (typeof CHECK_TABLE_EXISTENCE_ACTION)[keyof typeof CHECK_TABLE_EXISTENCE_ACTION];
type CreateTablesRequestActionType =
  (typeof CREATE_TABLES_ACTION)[keyof typeof CREATE_TABLES_ACTION];
type RegisterAdminRequestActionType =
  (typeof REGISTER_ADMIN_ACTION)[keyof typeof REGISTER_ADMIN_ACTION];

/* ------------------------- Initialization Actions ------------------------- */

interface ConnectDatabaseRequestAction {
  type: ConnectDatabaseRequestActionType;
  payload?: {
    error?: Error;
    response?: never;
  };
}

interface CloseDatabaseRequestAction {
  type: CloseDatabaseRequestActionType;
  payload?: {
    error?: Error;
    response?: never;
  };
}

interface CheckTableExistenceRequestAction {
  type: CheckTableExistenceRequestActionType;
  payload?: {
    error?: Error;
    response: string[];
  };
}

interface CreateTablesRequestAction {
  type: CreateTablesRequestActionType;
  payload?: {
    error?: Error;
    response?: never;
  };
}

interface RegisterAdminRequestAction {
  type: RegisterAdminRequestActionType;
  payload?: {
    error?: Error;
    response?: any;
  };
}

export type InitializationRequestAction =
  | ConnectDatabaseRequestAction
  | CloseDatabaseRequestAction
  | CheckTableExistenceRequestAction
  | CreateTablesRequestAction
  | RegisterAdminRequestAction;

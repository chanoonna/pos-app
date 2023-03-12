import {
  CONNECT_DB_MAP,
  CREATE_TABLES_MAP,
  REGISTER_ADMIN_MAP,
  INITIALIZATION_REQUEST
} from './constants';

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
export type ConnectDatabaseRequest = keyof typeof INITIALIZATION_REQUEST;

/* ----------------------- Initialization Action Types ---------------------- */

type ConnectDatabaseRequestActionType =
  (typeof CONNECT_DB_MAP)[keyof typeof CONNECT_DB_MAP];
type CreateTablesRequestActionType =
  (typeof CREATE_TABLES_MAP)[keyof typeof CREATE_TABLES_MAP];
type RegisterAdminRequestActionType =
  (typeof REGISTER_ADMIN_MAP)[keyof typeof REGISTER_ADMIN_MAP];

type InitializationRequestActionType =
  | ConnectDatabaseRequestActionType
  | CreateTablesRequestActionType
  | RegisterAdminRequestActionType;

/* ----------------------- Initialization Action Maps ----------------------- */

type ConnectDatabaseRequestActionMap = {
  REQUEST: typeof CONNECT_DB_MAP.REQUEST;
  FAILURE: typeof CONNECT_DB_MAP.FAILURE;
  SUCCESS: typeof CONNECT_DB_MAP.SUCCESS;
};

type CreateTablesRequestActionMap = {
  REQUEST: typeof CREATE_TABLES_MAP.REQUEST;
  FAILURE: typeof CREATE_TABLES_MAP.FAILURE;
  SUCCESS: typeof CREATE_TABLES_MAP.SUCCESS;
};

type RegisterAdminRequestActionMap = {
  REQUEST: typeof REGISTER_ADMIN_MAP.REQUEST;
  FAILURE: typeof REGISTER_ADMIN_MAP.FAILURE;
  SUCCESS: typeof REGISTER_ADMIN_MAP.SUCCESS;
};

export type InitializationRequestActionMap =
  | ConnectDatabaseRequestActionMap
  | CreateTablesRequestActionMap
  | RegisterAdminRequestActionMap;

/* ------------------------- Initialization Actions ------------------------- */

interface ConnectDatabaseRequestAction {
  type: ConnectDatabaseRequestActionType;
  payload?: {
    error?: Error;
    response?: never;
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
  | CreateTablesRequestAction
  | RegisterAdminRequestAction;

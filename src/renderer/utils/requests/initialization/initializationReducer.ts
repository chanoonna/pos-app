/* ---------------------------------- types --------------------------------- */
import type { InitializationState, InitializationRequestAction } from './types';

/* -------------------------------- constants ------------------------------- */
import {
  CONNECT_DB_ACTION,
  CREATE_TABLES_ACTION,
  REGISTER_ADMIN_ACTION,
  CHECK_TABLE_EXISTENCE_ACTION
} from './constants';

/* --------------------------------- imports -------------------------------- */
import difference from 'lodash/difference';

export const initializationReducer = (
  state: InitializationState,
  action: InitializationRequestAction
): InitializationState => {
  const { type, payload } = action;

  switch (type) {
    /* ------------------------------- CONNECT_DB ------------------------------- */
    case CONNECT_DB_ACTION.REQUEST: {
      window.api.startup.connect();

      return {
        ...state,
        isDatabaseConnecting: true
      };
    }
    case CONNECT_DB_ACTION.FAILURE: {
      return {
        ...state,
        isDatabaseConnecting: false,
        isDatabaseConnectionFailed: true
      };
    }
    case CONNECT_DB_ACTION.SUCCESS: {
      return {
        ...state,
        isDatabaseConnecting: false,
        isDatabaseConnected: true
      };
    }

    /* -------------------------- CHECK_TABLE_EXISTENCE ------------------------- */
    case CHECK_TABLE_EXISTENCE_ACTION.REQUEST: {
      window.api.startup.checkTables();

      return {
        ...state,
        isCheckingTableExistence: true
      };
    }
    case CHECK_TABLE_EXISTENCE_ACTION.FAILURE: {
      return {
        ...state,
        isCheckingTableExistence: false
      };
    }
    case CHECK_TABLE_EXISTENCE_ACTION.SUCCESS: {
      return {
        ...state,
        isCheckingTableExistence: false,
        isTableExistenceChecked: true,
        isAlltheTablesCreated: !payload?.response.tablesNotCreated.length,
        tablesNotCreated: payload?.response.tablesNotCreated || []
      };
    }

    /* ------------------------------ CREATE_TABLES ----------------------------- */
    case CREATE_TABLES_ACTION.REQUEST: {
      window.api.startup.createTables(state.tablesNotCreated);

      return {
        ...state,
        isTablesCreating: true
      };
    }
    case CREATE_TABLES_ACTION.FAILURE: {
      return {
        ...state,
        isTablesCreating: false,
        isTableCreationFailed: true
      };
    }
    case CREATE_TABLES_ACTION.SUCCESS: {
      return {
        ...state,
        isTablesCreating: false,
        isAlltheTablesCreated: true,
        tablesNotCreated: difference(
          state.tablesNotCreated,
          payload?.response?.tablesCreated || []
        )
      };
    }

    /* ----------------------------- REGISTER_ADMIN ----------------------------- */
    case REGISTER_ADMIN_ACTION.REQUEST: {
      return {
        ...state,
        isAdminRegistering: true
      };
    }
    case REGISTER_ADMIN_ACTION.FAILURE: {
      return {
        ...state,
        isAdminRegistering: false,
        isAdminRegistrationFailed: true
      };
    }
    case REGISTER_ADMIN_ACTION.SUCCESS: {
      return {
        ...state,
        isAdminRegistering: false,
        isAdminRegistered: true
      };
    }

    default:
      return state;
  }
};

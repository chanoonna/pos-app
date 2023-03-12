import type { InitializationState, InitializationRequestAction } from './types';
import {
  CONNECT_DB_MAP,
  CREATE_TABLES_MAP,
  REGISTER_ADMIN_MAP
} from './constants';

export const initializationReducer = (
  state: InitializationState,
  action: InitializationRequestAction
) => {
  switch (action.type) {
    /* ------------------------------- CONNECT_DB ------------------------------- */
    case CONNECT_DB_MAP.REQUEST: {
      return {
        ...state,
        isDatabaseConnecting: true
      };
    }
    case CONNECT_DB_MAP.FAILURE: {
      return {
        ...state,
        isDatabaseConnecting: false,
        isDatabaseConnectionFailed: true
      };
    }
    case CONNECT_DB_MAP.SUCCESS: {
      return {
        ...state,
        isDatabaseConnecting: false,
        isDatabaseConnected: true
      };
    }

    /* ------------------------------ CREATE_TABLES ----------------------------- */
    case CREATE_TABLES_MAP.REQUEST: {
      return {
        ...state,
        isTablesCreating: true
      };
    }
    case CREATE_TABLES_MAP.FAILURE: {
      return {
        ...state,
        isTablesCreating: false,
        isTableCreationFailed: true
      };
    }
    case CREATE_TABLES_MAP.SUCCESS: {
      return {
        ...state,
        isTablesCreating: false,
        isTablesCreated: true
      };
    }

    /* ----------------------------- REGISTER_ADMIN ----------------------------- */
    case REGISTER_ADMIN_MAP.REQUEST: {
      return {
        ...state,
        isAdminRegistering: true
      };
    }
    case REGISTER_ADMIN_MAP.FAILURE: {
      return {
        ...state,
        isAdminRegistering: false,
        isAdminRegistrationFailed: true
      };
    }
    case REGISTER_ADMIN_MAP.SUCCESS: {
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

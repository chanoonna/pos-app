import type { InitializationState, InitializationRequestAction } from './types';
import {
  CONNECT_DB_ACTION,
  CREATE_TABLES_ACTION,
  REGISTER_ADMIN_ACTION
} from './constants';

export const initializationReducer = (
  state: InitializationState,
  action: InitializationRequestAction
) => {
  switch (action.type) {
    /* ------------------------------- CONNECT_DB ------------------------------- */
    case CONNECT_DB_ACTION.REQUEST: {
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

    /* ------------------------------ CREATE_TABLES ----------------------------- */
    case CREATE_TABLES_ACTION.REQUEST: {
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
        isTablesCreated: true
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

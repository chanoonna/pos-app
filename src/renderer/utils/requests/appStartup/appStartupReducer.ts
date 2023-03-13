/* ---------------------------------- types --------------------------------- */
import type { AppStartupState, AppStartupRequestAction } from './types';

/* -------------------------------- constants ------------------------------- */
import { DB_CONNECT_ACTION, DB_REGISTER_ADMIN_ACTION } from './constants';

export const appStartupReducer = (
  state: AppStartupState,
  action: AppStartupRequestAction
): AppStartupState => {
  const { type, payload } = action;

  switch (type) {
    /* ------------------------------- CONNECT_DB ------------------------------- */
    case DB_CONNECT_ACTION.REQUEST: {
      return {
        ...state,
        isDatabaseConnecting: true
      };
    }
    case DB_CONNECT_ACTION.FAILURE: {
      return {
        ...state,
        isDatabaseConnecting: false,
        isDatabaseConnectionFailed: true
      };
    }
    case DB_CONNECT_ACTION.SUCCESS: {
      return {
        ...state,
        isDatabaseConnecting: false,
        isDatabaseConnected: true,
        isDatabaseReady: !!payload?.response?.isDatabaseReady
      };
    }

    /* ----------------------------- REGISTER_ADMIN ----------------------------- */
    case DB_REGISTER_ADMIN_ACTION.REQUEST: {
      return {
        ...state,
        isAdminRegistering: true
      };
    }
    case DB_REGISTER_ADMIN_ACTION.FAILURE: {
      return {
        ...state,
        isAdminRegistering: false,
        isAdminRegistrationFailed: true
      };
    }
    case DB_REGISTER_ADMIN_ACTION.SUCCESS: {
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

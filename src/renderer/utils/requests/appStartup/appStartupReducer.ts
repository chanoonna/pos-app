/* ---------------------------------- types --------------------------------- */
import type { AppStartupState, AppStartupRequestAction } from './types';

/* -------------------------------- constants ------------------------------- */
import {
  DB_CONNECT_ACTION,
  DB_REGISTER_ADMIN_ACTION,
  DB_GET_LOGIN_ACTIVITIES_ACTION,
  SET_LANGUAGE
} from './constants';

export const appStartupReducer = (
  state: AppStartupState,
  action: AppStartupRequestAction
): AppStartupState => {
  const { type, payload } = action;

  switch (type) {
    /* ------------------------------ SET_LANGUAGE ------------------------------ */
    case SET_LANGUAGE: {
      return {
        ...state,
        lastUserSetting: {
          ...state.lastUserSetting,
          ...(payload?.language && { language: payload.language })
        }
      };
    }
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

    /* ------------------------- DB_GET_LOGIN_ACTIVITIES ------------------------ */
    case DB_GET_LOGIN_ACTIVITIES_ACTION.REQUEST: {
      return {
        ...state,
        isGettingLoginActivities: true
      };
    }
    case DB_GET_LOGIN_ACTIVITIES_ACTION.FAILURE: {
      return {
        ...state,
        isGettingLoginActivities: false
      };
    }
    case DB_GET_LOGIN_ACTIVITIES_ACTION.SUCCESS: {
      console.log(payload);
      return {
        ...state,
        isGettingLoginActivities: false,
        lsatLoggedInUser: payload?.response?.loginActivities?.[0]
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

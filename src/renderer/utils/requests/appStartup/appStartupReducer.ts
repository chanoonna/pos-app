/* ---------------------------------- types --------------------------------- */
import type { AppStartupState, AppStartupRequestAction } from './types';

/* -------------------------------- constants ------------------------------- */
import { DB_CONNECT_ACTION, APP_STARTUP_STATUS } from './constants';

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
        status: APP_STARTUP_STATUS.CONNECTING_DB
      };
    }
    case DB_CONNECT_ACTION.FAILURE: {
      return {
        ...state,
        status: APP_STARTUP_STATUS.ERROR,
        error: payload?.error
      };
    }
    case DB_CONNECT_ACTION.SUCCESS: {
      console.log(payload);
      return {
        ...state,
        status: payload?.response?.isFirstStartup
          ? APP_STARTUP_STATUS.SETTING_LANGUAGE
          : APP_STARTUP_STATUS.REDIRECTING_TO_LOGIN
      };
    }

    default:
      return state;
  }
};

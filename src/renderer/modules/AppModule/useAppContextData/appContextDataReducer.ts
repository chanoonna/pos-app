/* ---------------------------------- types --------------------------------- */
import type { AppContextDataState, AppContextDataAction } from './types';

/* -------------------------------- constants ------------------------------- */
import { CONNECT, NAVIGATE_TO, LOGOUT } from './constants';

/* ------------------------------------ - ----------------------------------- */

export const appContextDataReducer = (
  state: AppContextDataState,
  action: AppContextDataAction
) => {
  switch (action.type) {
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    case NAVIGATE_TO: {
      const { nextPage } = action.payload;
      return {
        ...state,
        currentPage: nextPage
      };
    }
    case CONNECT.REQUEST: {
      return {
        ...state,
        isConnecting: true
      };
    }
    case CONNECT.FAILURE: {
      return {
        ...state,
        isConnecting: false,
        isConnectedError: true
      };
    }
    case CONNECT.SUCCESS: {
      return {
        ...state,
        isConnecting: false,
        isConnected: true,
        isConnectedError: false,
        user: action.payload.response
      };
    }
    default:
      return state;
  }
};

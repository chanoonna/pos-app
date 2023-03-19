/* ---------------------------------- types --------------------------------- */
import type { AppContextDataState, AppContextDataAction } from './types';

/* -------------------------------- constants ------------------------------- */
import { CONNECT, NAVIGATE_TO, LOGOUT, CREATE_ADMIN } from './constants';

/* ------------------------------------ - ----------------------------------- */

export const appContextDataReducer = (
  state: AppContextDataState,
  action: AppContextDataAction
) => {
  switch (action.type) {
    /* --------------------------------- LOGOUT --------------------------------- */
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false
      };
    }

    /* ------------------------------- NAVIGATE_TO ------------------------------ */
    case NAVIGATE_TO: {
      const { nextPage } = action.payload;
      return {
        ...state,
        currentPage: nextPage
      };
    }

    /* --------------------------------- CONNECT -------------------------------- */
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
      if (action.payload.response) {
        return {
          ...state,
          isConnecting: false,
          isConnected: true,
          isConnectedError: false,
          user: {
            id: action.payload.response.id,
            username: action.payload.response.username,
            last_login: action.payload.response.last_login,
            language: action.payload.response.language,
            ui_size: action.payload.response.ui_size,
            color_theme: action.payload.response.color_theme,
            access_level: action.payload.response.access_level
          }
        };
      }

      return {
        ...state,
        isConnecting: false,
        isConnected: true,
        isConnectedError: false
      };
    }

    /* ------------------------------ CREATE_ADMIN ------------------------------ */
    case CREATE_ADMIN.REQUEST: {
      return {
        ...state,
        isCreatingAdmin: true
      };
    }
    case CREATE_ADMIN.FAILURE: {
      return {
        ...state,
        isCreatingAdmin: false,
        isCreatingAdminError: true
      };
    }
    case CREATE_ADMIN.SUCCESS: {
      return {
        ...state,
        isCreatingAdmin: false,
        isCreatingAdminError: false,
        user: action.payload.response[0]
      };
    }

    default:
      return state;
  }
};

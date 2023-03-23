/* ---------------------------------- types --------------------------------- */
import type { AppContextDataState, AppContextDataAction } from './types';

/* -------------------------------- constants ------------------------------- */
import {
  CONNECT,
  NAVIGATE_TO,
  LOGOUT,
  CREATE_ADMIN,
  LOGIN,
  GET_SETTINGS,
  UPDATE_SETTINGS,
  SET_SETTINGS_MODAL_OPEN,
  GET_STORE_INFO,
  UPDATE_STORE_INFO
} from './constants';

/* ------------------------------------ - ----------------------------------- */

export const appContextDataReducer = (
  state: AppContextDataState,
  action: AppContextDataAction
): AppContextDataState => {
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
            lastLogin: action.payload.response.last_login,
            accessLevel: action.payload.response.access_level
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
        isCreatingAdminError: false
      };
    }

    /* ---------------------------------- LOGIN --------------------------------- */
    case LOGIN.REQUEST: {
      return {
        ...state,
        isLoggingIn: true
      };
    }
    case LOGIN.FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggingInError: true
      };
    }
    case LOGIN.SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggingInError: false,
        isAuthenticated: true,
        user: {
          id: action.payload.response.id,
          username: action.payload.response.username,
          lastLogin: action.payload.response.last_login,
          accessLevel: action.payload.response.access_level
        }
      };
    }

    /* ------------------------------ GET_SETTINGS ------------------------------ */
    case GET_SETTINGS.SUCCESS: {
      return {
        ...state,
        settingsState: {
          ...state.settingsState,
          language: action.payload.response.language,
          uiSize: action.payload.response.ui_size,
          colorTheme: action.payload.response.color_theme
        }
      };
    }

    /* ----------------------------- UPDATE_SETTINGS ---------------------------- */
    case UPDATE_SETTINGS.SUCCESS: {
      return {
        ...state,
        settingsState: {
          ...state.settingsState,
          language: action.payload.response.language,
          uiSize: action.payload.response.ui_size,
          colorTheme: action.payload.response.color_theme
        }
      };
    }

    /* ----------------------------- GET_STORE_INFO ----------------------------- */
    case GET_STORE_INFO.SUCCESS: {
      return {
        ...state,
        storeInfoState: {
          ...state.storeInfoState,
          storeName: action.payload.response.store_name,
          storeAddress1: action.payload.response.store_address1,
          storeAddress2: action.payload.response.store_address2,
          storeCity: action.payload.response.store_city,
          storeProvince: action.payload.response.store_province,
          storePostalCode: action.payload.response.store_postal_code,
          storePhoneNumber: action.payload.response.store_phone_number,
          storeFaxNumber: action.payload.response.store_fax_number,
          storeEmail: action.payload.response.store_email,
          storeWebsite: action.payload.response.store_website
        }
      };
    }

    /* ---------------------------- UPDATE_STORE_INFO --------------------------- */
    case UPDATE_STORE_INFO.SUCCESS: {
      return {
        ...state,
        storeInfoState: {
          ...state.storeInfoState,
          storeName: action.payload.response.store_name,
          storeAddress1: action.payload.response.store_address1,
          storeAddress2: action.payload.response.store_address2,
          storeCity: action.payload.response.store_city,
          storeProvince: action.payload.response.store_province,
          storePostalCode: action.payload.response.store_postal_code,
          storePhoneNumber: action.payload.response.store_phone_number,
          storeFaxNumber: action.payload.response.store_fax_number,
          storeEmail: action.payload.response.store_email,
          storeWebsite: action.payload.response.store_website
        }
      };
    }

    /* ------------------------- SET_SETTINGS_MODAL_OPEN ------------------------ */
    case SET_SETTINGS_MODAL_OPEN: {
      return {
        ...state,
        modalState: {
          ...state.modalState,
          isSettingsModalOpen: action.payload.isSettingsModalOpen
        }
      };
    }

    default:
      return state;
  }
};

/* ---------------------------------- types --------------------------------- */
import type { AppContextDataState } from './types';
import type { AppPage } from 'modules/types';
import type { Settings, StoreInfo, User } from 'models';
import type { LoginParams } from 'preload/api/users/types';
import type { UpdateSettingsParams } from 'api/types';

/* -------------------------------- constants ------------------------------- */
import { APP_PAGE } from 'modules/constants';
import { ENGLISH } from 'SettingsModule/constants';
import {
  CONNECT,
  CREATE_ADMIN,
  NAVIGATE_TO,
  LOGOUT,
  LOGIN,
  GET_SETTINGS,
  UPDATE_SETTINGS,
  SET_SETTINGS_MODAL_OPEN,
  GET_STORE_INFO,
  UPDATE_STORE_INFO
} from './constants';

/* ------------------------------------ - ----------------------------------- */
import { useReducer, useCallback } from 'react';
import { appContextDataReducer } from './appContextDataReducer';
import { handleRequestAction } from './utils';
import {
  connectToMain,
  createUser,
  login,
  getSettings as _getSettings,
  updateSettings as _updateSettings,
  getStoreInfo as _getStoreInfo,
  updateStoreInfo as _updateStoreInfo
} from 'api';

const initialData: AppContextDataState = {
  user: undefined,
  isLoggingIn: false,
  isLoggingInError: false,
  isAuthenticated: false,
  isConnected: false,
  isConnecting: false,
  isConnectedError: false,
  isCreatingAdmin: false,
  isCreatingAdminError: false,
  currentPage: APP_PAGE.APP_START,
  settingsState: {
    isSettingsModalOpen: false,
    language: ENGLISH,
    uiSize: 'large',
    colorTheme: 'bright',
    storeName: '',
    storeAddress1: '',
    storeAddress2: '',
    storeCity: '',
    storeProvince: '',
    storePostalCode: '',
    storePhoneNumber: '',
    storeFaxNumber: '',
    storeEmail: '',
    storeWebsite: ''
  }
};

export const useAppContextData = () => {
  const [state, dispatch] = useReducer(appContextDataReducer, initialData);

  const getSettings = useCallback(() => {
    handleRequestAction({
      dispatch,
      action: GET_SETTINGS,
      request: _getSettings
    });
  }, []);

  const updateSettings = useCallback((params: UpdateSettingsParams) => {
    handleRequestAction({
      dispatch,
      action: UPDATE_SETTINGS,
      request: _updateSettings,
      params
    });
  }, []);

  const getStoreInfo = useCallback(() => {
    handleRequestAction({
      dispatch,
      action: GET_STORE_INFO,
      request: _getStoreInfo
    });
  }, []);

  const updateStoreInfo = useCallback((params: StoreInfo) => {
    handleRequestAction({
      dispatch,
      action: UPDATE_STORE_INFO,
      request: _updateStoreInfo,
      params: {
        store_name: params.storeName,
        store_address1: params.storeAddress1,
        store_address2: params.storeAddress2,
        store_city: params.storeCity,
        store_province: params.storeProvince,
        store_postal_code: params.storePostalCode,
        store_phone_number: params.storePhoneNumber,
        store_fax_number: params.storeFaxNumber,
        store_email: params.storeEmail,
        store_website: params.storeWebsite
      }
    });
  }, []);

  const setSettingsModalOpen = useCallback(
    (isSettingsModalOpen: boolean) => {
      dispatch({
        type: SET_SETTINGS_MODAL_OPEN,
        payload: { isSettingsModalOpen }
      });
    },
    [dispatch]
  );

  const navigateTo = useCallback((nextPage: AppPage) => {
    dispatch({ type: NAVIGATE_TO, payload: { nextPage } });
  }, []);

  const logIn = useCallback(
    (params: LoginParams) => {
      handleRequestAction({
        dispatch,
        action: LOGIN,
        request: login,
        params,
        onSuccess: [
          () => {
            navigateTo(APP_PAGE.MENU);
          }
        ]
      });
    },
    [navigateTo]
  );

  const logOut = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigateTo(APP_PAGE.LOGIN);
  }, [navigateTo]);

  /* special case with no response is not failure */
  const connect = useCallback(() => {
    handleRequestAction({
      dispatch,
      action: CONNECT,
      request: connectToMain,
      onSuccess: [
        (response) => {
          if (response) {
            navigateTo(APP_PAGE.LOGIN);
          }
        }
      ]
    });
  }, [navigateTo]);

  const createAdmin = useCallback(
    (params: Pick<User, 'username' | 'accessLevel'> & { password: string }) => {
      handleRequestAction({
        dispatch,
        action: CREATE_ADMIN,
        request: createUser,
        params: {
          username: params.username,
          password: params.password,
          access_level: params.accessLevel
        },
        onSuccess: [
          () => {
            logIn({
              username: params.username,
              password: params.password
            });
          }
        ]
      });
    },
    [logIn]
  );

  return {
    state,
    connect,
    navigateTo,
    logOut,
    logIn,
    createAdmin,
    getSettings,
    updateSettings,
    getStoreInfo,
    updateStoreInfo,
    setSettingsModalOpen
  };
};

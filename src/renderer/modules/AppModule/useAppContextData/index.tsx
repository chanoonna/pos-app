/* ---------------------------------- types --------------------------------- */
import type { AppContextDataState } from './types';
import type { AppPage } from 'modules/types';
import type { User } from 'models';
import type { LoginParamsDB } from 'preload/api/users/types';
import type { UpdateSettingsParams, UpdateStoreInfoParams } from 'api/types';

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
  UPDATE_STORE_INFO,
  SET_MY_INFO_MODAL_OPEN
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
    language: ENGLISH,
    uiSize: 'large',
    colorTheme: 'bright'
  },
  storeInfoState: {
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
  },
  modalState: {
    isSettingsModalOpen: false,
    isMyInfoModalOpen: false
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

  const updateStoreInfo = useCallback((params: UpdateStoreInfoParams) => {
    handleRequestAction({
      dispatch,
      action: UPDATE_STORE_INFO,
      request: _updateStoreInfo,
      params
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

  const setMyInfoModalOpen = useCallback(
    (isMyInfoModalOpen: boolean) => {
      dispatch({
        type: SET_MY_INFO_MODAL_OPEN,
        payload: { isMyInfoModalOpen }
      });
    },
    [dispatch]
  );

  const navigateTo = useCallback((nextPage: AppPage) => {
    dispatch({ type: NAVIGATE_TO, payload: { nextPage } });
  }, []);

  const logIn = useCallback(
    (params: LoginParamsDB) => {
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
        params,
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
    setSettingsModalOpen,
    setMyInfoModalOpen
  };
};

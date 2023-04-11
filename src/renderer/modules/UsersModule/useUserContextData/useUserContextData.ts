/* ---------------------------------- types --------------------------------- */
import type { AppContextDataState } from './types';
import type { AppPage } from 'modules/types';
import type { LoginParamsDB } from 'preload/api/users/types';
import type {
  CreateUserParams,
  UpdateSettingsParams,
  UpdateStoreInfoParams,
  UpdateUserParams
} from 'api/types';

/* -------------------------------- constants ------------------------------- */
import { APP_PAGE } from 'modules/constants';
import { ENGLISH } from 'SettingsModule/constants';
import {
  CONNECT,
  CREATE_USER,
  UPDATE_USER,
  NAVIGATE_TO,
  LOGOUT,
  LOGIN,
  GET_SETTINGS,
  UPDATE_SETTINGS,
  SET_SETTINGS_MODAL_OPEN,
  GET_STORE_INFO,
  UPDATE_STORE_INFO,
  SET_MY_INFO_MODAL_OPEN,
  UPDATE_ME
} from './constants';

/* ------------------------------------ - ----------------------------------- */
import { useReducer, useCallback } from 'react';
import { appContextDataReducer } from './appContextDataReducer';
import { handleRequestAction } from './utils';
import {
  connectToMain,
  login,
  createUser as _createUser,
  updateUser as _updateUser,
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

export const useUserContextData = () => {
  const [state, dispatch] = useReducer(appContextDataReducer, initialData);

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

  const createUser = useCallback(
    (params: CreateUserParams) => {
      handleRequestAction({
        dispatch,
        action: CREATE_USER,
        request: _createUser,
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

  const updateUser = useCallback((params: UpdateUserParams) => {
    handleRequestAction({
      dispatch,
      action: UPDATE_USER,
      request: _updateUser,
      params
    });
  }, []);

  const updateMe = useCallback((params: UpdateUserParams) => {
    handleRequestAction({
      dispatch,
      action: UPDATE_ME,
      request: _updateUser,
      params
    });
  }, []);

  return {
    state,
    connect,
    navigateTo,
    logOut,
    logIn,
    createUser,
    updateUser,
    updateMe,
    getSettings,
    updateSettings,
    getStoreInfo,
    updateStoreInfo,
    setSettingsModalOpen,
    setMyInfoModalOpen
  };
};

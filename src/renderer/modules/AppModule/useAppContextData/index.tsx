/* ---------------------------------- types --------------------------------- */
import type { AppContextDataState } from './types';
import type { AppPage } from 'modules/types';

/* -------------------------------- constants ------------------------------- */
import { APP_PAGE } from 'modules/constants';
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
import {
  connectToMain,
  createUser,
  login,
  getSettings as _getSettings,
  updateSettings as _updateSettings,
  getStoreInfo as _getStoreInfo,
  updateStoreInfo as _updateStoreInfo
} from 'api';
import { CreateUserParams, LoginParams } from 'preload/api/users/types';
import { ENGLISH } from 'SettingsModule/constants';
import { Settings, StoreInfo } from 'models';

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

  const getSettings = useCallback(async () => {
    try {
      dispatch({ type: GET_SETTINGS.REQUEST });
      const { response, error } = await _getSettings();

      if (error) {
        dispatch({
          type: GET_SETTINGS.FAILURE,
          payload: { error }
        });
      } else {
        dispatch({
          type: GET_SETTINGS.SUCCESS,
          payload: { response }
        });
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
  }, []);

  const updateSettings = useCallback(async (params: Settings) => {
    try {
      dispatch({ type: UPDATE_SETTINGS.REQUEST });
      const { response, error } = await _updateSettings({
        language: params.language,
        ui_size: params.uiSize,
        color_theme: params.colorTheme
      });

      if (error) {
        dispatch({
          type: UPDATE_SETTINGS.FAILURE,
          payload: { error }
        });
      } else {
        dispatch({
          type: UPDATE_SETTINGS.SUCCESS,
          payload: { response }
        });
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
  }, []);

  const getStoreInfo = useCallback(async () => {
    try {
      dispatch({ type: GET_STORE_INFO.REQUEST });
      const { response, error } = await _getStoreInfo();

      if (error) {
        dispatch({
          type: GET_STORE_INFO.FAILURE,
          payload: { error }
        });
      } else {
        dispatch({
          type: GET_STORE_INFO.SUCCESS,
          payload: { response }
        });
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
  }, []);

  const updateStoreInfo = useCallback(async (params: StoreInfo) => {
    try {
      dispatch({ type: UPDATE_STORE_INFO.REQUEST });
      const { response, error } = await _updateStoreInfo({
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
      });

      if (error) {
        dispatch({
          type: UPDATE_STORE_INFO.FAILURE,
          payload: { error }
        });
      } else {
        dispatch({
          type: UPDATE_STORE_INFO.SUCCESS,
          payload: { response }
        });
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
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
    async (params: LoginParams) => {
      try {
        dispatch({ type: LOGIN.REQUEST });
        const { response, error } = await login(params);

        if (error) {
          dispatch({
            type: LOGIN.FAILURE,
            payload: { error }
          });
        } else {
          dispatch({
            type: LOGIN.SUCCESS,
            payload: { response }
          });
          navigateTo(APP_PAGE.MENU);
        }
      } catch (error) {
        // TODO
        console.log(error);
      }
    },
    [navigateTo]
  );

  const logOut = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigateTo(APP_PAGE.LOGIN);
  }, [navigateTo]);

  const connect = useCallback(async () => {
    try {
      dispatch({ type: CONNECT.REQUEST });

      const { response, error } = await connectToMain();

      if (error) {
        dispatch({
          type: CONNECT.FAILURE,
          payload: { error }
        });
      } else {
        dispatch({
          type: CONNECT.SUCCESS,
          payload: { response }
        });

        if (response) {
          navigateTo(APP_PAGE.LOGIN);
        }
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
  }, [navigateTo]);

  const createAdmin = useCallback(
    async (params: CreateUserParams) => {
      try {
        dispatch({ type: CREATE_ADMIN.REQUEST, payload: { params } });
        const { error } = await createUser(params);

        if (error) {
          dispatch({
            type: CREATE_ADMIN.FAILURE,
            payload: { error }
          });
        } else {
          dispatch({
            type: CREATE_ADMIN.SUCCESS
          });
          logIn({
            username: params.username,
            password: params.password
          });
        }
      } catch (error) {
        // TODO
        console.log(error);
      }
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

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
  UPDATE_SETTINGS
} from './constants';

/* ------------------------------------ - ----------------------------------- */
import { useReducer, useCallback } from 'react';
import { appContextDataReducer } from './appContextDataReducer';
import {
  connectToMain,
  createUser,
  login,
  getSettings as _getSettings,
  updateSettings as _updateSettings
} from 'api';
import { CreateUserParams, LoginParams } from 'preload/api/users/types';
import { ENGLISH } from 'renderer/modules/SettingsModule/constants';
import { Settings } from 'renderer/models';

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
    colorTheme: 'bright'
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
    updateSettings
  };
};

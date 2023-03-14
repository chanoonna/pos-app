/* ---------------------------------- types --------------------------------- */
import type { AppStartupState, ConnectDatabaseRequest } from './types';

/* -------------------------------- constants ------------------------------- */
import { APP_STARTUP_REQUEST } from './constants';
import { API_RESPONSE_CHANNEL } from 'preload/api/constants';

/* --------------------------------- imports -------------------------------- */
import { useReducer, useEffect, useCallback } from 'react';
import { appStartupReducer } from './appStartupReducer';
import { Method, Route } from 'preload/api/types';
import { getAppStartupRequestListener } from './appStartupListener';

const initialState: AppStartupState = {
  isDatabaseConnected: false,
  isDatabaseConnecting: false,
  isDatabaseConnectionFailed: false,
  isDatabaseReady: false,
  isAdminRegistered: false,
  isAdminRegistering: false,
  isAdminRegistrationFailed: false,
  isGettingLoginActivities: false,
  lsatLoggedInUser: undefined,
  lastUserSetting: undefined
};

export const useAppStartupState = () => {
  const [appStartupState, dispatch] = useReducer(
    appStartupReducer,
    initialState
  );

  const connect = useCallback(() => {
    dispatch({
      type: APP_STARTUP_REQUEST.DB_CONNECT.REQUEST
    });
    window.api.connect();
  }, []);

  const callApi = useCallback(
    ({
      requestAction,
      method,
      route,
      params
    }: {
      requestAction: ConnectDatabaseRequest;
      method: Method;
      route: Route;
      params?: {
        [key: string]: any;
      };
    }) => {
      dispatch({
        type: APP_STARTUP_REQUEST[requestAction].REQUEST
      });
      window.api.request<
        ConnectDatabaseRequest,
        { requestAction: ConnectDatabaseRequest }
      >(API_RESPONSE_CHANNEL.DB_STARTUP, {
        method,
        route,
        params: { requestAction, ...params }
      });
    },
    []
  );

  useEffect(() => {
    const listener = getAppStartupRequestListener(dispatch);

    window.api.on(API_RESPONSE_CHANNEL.DB_STARTUP, listener);

    return () => {
      window.api.off(API_RESPONSE_CHANNEL.DB_STARTUP, listener);
    };
  }, []);

  return { appStartupState, callApi, connect };
};

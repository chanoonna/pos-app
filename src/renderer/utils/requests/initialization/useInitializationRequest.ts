/* ---------------------------------- types --------------------------------- */
import type { InitializationState, ConnectDatabaseRequest } from './types';

/* -------------------------------- constants ------------------------------- */
import { INITIALIZATION_REQUEST } from './constants';
import { API_RESPONSE_CHANNEL } from 'preload/api/constants';

/* --------------------------------- imports -------------------------------- */
import { useReducer, useEffect, useCallback } from 'react';
import { initializationReducer } from './initializationReducer';
import { Method, Route } from 'preload/api/types';
import { getInitializationRequestListener } from './initializationListener';

const initialState: InitializationState = {
  isDatabaseConnected: false,
  isDatabaseConnecting: false,
  isDatabaseConnectionFailed: false,
  isTablesCreated: false,
  isTablesCreating: false,
  isTableCreationFailed: false,
  isAdminRegistered: false,
  isAdminRegistering: false,
  isAdminRegistrationFailed: false
};

export const useInitializationRequest = () => {
  const [initilizationState, dispatch] = useReducer(
    initializationReducer,
    initialState
  );

  const connect = useCallback(() => {
    dispatch({
      type: INITIALIZATION_REQUEST.CONNECT_DB.REQUEST
    });
    window.api.startup.connect();
  }, []);
  const checkTables = useCallback(() => {
    dispatch({
      type: INITIALIZATION_REQUEST.CHECK_TABLE_EXISTENCE.REQUEST
    });
  }, []);

  const callApi = useCallback(
    (requestAction: ConnectDatabaseRequest, method: Method, route: Route) => {
      dispatch({
        type: INITIALIZATION_REQUEST[requestAction].REQUEST
      });
      window.api.main.request<
        ConnectDatabaseRequest,
        { requestAction: ConnectDatabaseRequest }
      >(API_RESPONSE_CHANNEL.DB_INITIALIZATION, {
        method,
        route,
        body: { requestAction }
      });
    },
    []
  );

  useEffect(() => {
    const listener = getInitializationRequestListener(dispatch);

    window.api.main.on(API_RESPONSE_CHANNEL.DB_INITIALIZATION, listener);

    return () => {
      window.api.main.off(API_RESPONSE_CHANNEL.DB_INITIALIZATION, listener);
    };
  }, []);

  return { initilizationState, callApi, connect, checkTables };
};

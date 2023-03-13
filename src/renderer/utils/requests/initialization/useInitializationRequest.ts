/* --------------------------- Types and Constants -------------------------- */
import type { IpcRendererEvent } from 'electron';
import type { Dispatch } from 'react';
import type {
  InitializationRequestAction,
  InitializationState,
  ConnectDatabaseRequest
} from './types';

import { CONNECT_DB_ACTION, INITIALIZATION_REQUEST } from './constants';
import { API_RESPONSE_CHANNEL } from 'preload/api/constants';

/* --------------------------------- Imports -------------------------------- */
import { useReducer, useEffect, useCallback } from 'react';
import { initializationReducer } from './initializationReducer';
import { Method, Route } from 'preload/api/types';

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
  const [state, dispatch] = useReducer(initializationReducer, initialState);

  const connect = useCallback(() => {
    dispatch({
      type: CONNECT_DB_ACTION.REQUEST
    });
    window.api.connect();
  }, []);

  const callApi = useCallback(
    (requestAction: ConnectDatabaseRequest, method: Method, route: Route) => {
      dispatch({
        type: INITIALIZATION_REQUEST[requestAction].REQUEST
      });
      window.api.request<
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

    window.api.on(API_RESPONSE_CHANNEL.DB_INITIALIZATION, listener);

    return () => {
      window.api.off(API_RESPONSE_CHANNEL.DB_INITIALIZATION, listener);
    };
  }, []);

  return { state, callApi, connect };
};

const getInitializationRequestListener =
  (dispatch: Dispatch<InitializationRequestAction>) =>
  (
    _: IpcRendererEvent,
    {
      requestBody,
      error,
      response
    }: {
      requestBody: {
        requestAction: ConnectDatabaseRequest;
        [key: string]: any;
      };
      error?: Error;
      response?: any;
    }
  ) => {
    dispatch({
      type: error
        ? INITIALIZATION_REQUEST[requestBody.requestAction].FAILURE
        : INITIALIZATION_REQUEST[requestBody.requestAction].SUCCESS,
      payload: { response, error }
    });
  };

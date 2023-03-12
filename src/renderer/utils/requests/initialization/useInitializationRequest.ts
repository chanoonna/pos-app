/* --------------------------- Types and Constants -------------------------- */
import type { IpcRendererEvent } from 'electron';
import type { Dispatch } from 'react';
import type {
  InitializationRequestAction,
  InitializationState,
  ConnectDatabaseRequest
} from './types';

import { INITIALIZATION_REQUEST } from './constants';
import { API_CHANNEL } from 'preload/api/constants';

/* --------------------------------- Imports -------------------------------- */
import { useReducer, useEffect, useCallback } from 'react';
import { initializationReducer } from './initializationReducer';

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

  const callApi = useCallback((requestAction: ConnectDatabaseRequest) => {
    dispatch({
      type: INITIALIZATION_REQUEST[requestAction].REQUEST
    });
    window.api.request<
      ConnectDatabaseRequest,
      { requestAction: ConnectDatabaseRequest },
      typeof API_CHANNEL.DB_INITIALIZATION
    >(API_CHANNEL.DB_INITIALIZATION, {
      body: { requestAction }
    });
  }, []);

  useEffect(() => {
    const listener = getInitializationRequestListener(dispatch);

    window.api.on(API_CHANNEL.DB_INITIALIZATION, listener);

    return () => {
      window.api.off(API_CHANNEL.DB_INITIALIZATION, listener);
    };
  }, []);

  return { state, callApi };
};

const getInitializationRequestListener =
  (dispatch: Dispatch<InitializationRequestAction>) =>
  (
    _: IpcRendererEvent,
    {
      requestAction,
      error,
      response
    }: {
      requestAction: ConnectDatabaseRequest;
      error?: Error;
      response?: any;
    }
  ) => {
    if (error) {
      dispatch({
        type: INITIALIZATION_REQUEST[requestAction].FAILURE,
        payload: { error }
      });
    } else {
      dispatch({
        type: INITIALIZATION_REQUEST[requestAction].SUCCESS,
        payload: {
          response
        }
      });
    }
  };

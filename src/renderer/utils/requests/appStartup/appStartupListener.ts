/* ---------------------------------- types --------------------------------- */
import type { IpcRendererEvent } from 'electron';
import type { Dispatch } from 'react';
import type { AppStartupRequestAction, ConnectDatabaseRequest } from './types';

/* -------------------------------- constants ------------------------------- */
import { APP_STARTUP_REQUEST } from './constants';

export const getAppStartupRequestListener =
  (dispatch: Dispatch<AppStartupRequestAction>) =>
  (
    _: IpcRendererEvent,
    {
      requestParams,
      error,
      response
    }: {
      requestParams: {
        requestAction: ConnectDatabaseRequest;
        [key: string]: any;
      };
      error?: Error;
      response?: any;
    }
  ) => {
    dispatch({
      type: error
        ? APP_STARTUP_REQUEST[requestParams.requestAction].FAILURE
        : APP_STARTUP_REQUEST[requestParams.requestAction].SUCCESS,
      payload: { response, error }
    });
  };

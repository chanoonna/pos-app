/* ---------------------------------- types --------------------------------- */
import type { IpcRendererEvent } from 'electron';
import type { Dispatch } from 'react';
import type {
  InitializationRequestAction,
  ConnectDatabaseRequest
} from './types';

/* -------------------------------- constants ------------------------------- */
import { INITIALIZATION_REQUEST } from './constants';

export const getInitializationRequestListener =
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

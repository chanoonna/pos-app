/* ---------------------------------- types --------------------------------- */
import type { IpcMainInvokeEvent } from 'electron';
import type { DataRequest } from './types';

/* -------------------------------- constants ------------------------------- */
import { API, ERROR_UNSPECIFIED } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcMain } from 'electron';
import { handleCatchAndPrintLog } from './utils';
import { connect } from './connect';
import { createUser, login } from './users';

export const startApiRequestHandlers = () => {
  ipcMain.handle(
    API,
    async (_event: IpcMainInvokeEvent, { action, params }: DataRequest) => {
      try {
        switch (action) {
          /* --------------------------------- connect -------------------------------- */
          case 'connect': {
            const { queryResult, userFriendlyError } = await connect();

            return {
              response: queryResult,
              error: userFriendlyError
            };
          }

          /* ---------------------------------- users --------------------------------- */
          case 'createUser': {
            const { queryResult, userFriendlyError } = await createUser(params);

            return {
              response: queryResult,
              error: userFriendlyError
            };
          }
          case 'login': {
            const { queryResult, userFriendlyError } = await login({ params });

            return {
              response: queryResult,
              error: userFriendlyError
            };
          }

          /* --------------------------------- default -------------------------------- */
          default: {
            const error = new Error(`Invalid request action: ${action}`);

            return {
              error: error.message
            };
          }
        }
      } catch (error) {
        const userFriendlyError = `${ERROR_UNSPECIFIED} while processing the request for ${action}}`;
        return {
          error: handleCatchAndPrintLog({
            action,
            error,
            alternateMessage: userFriendlyError
          }),
          userFriendlyError
        };
      }
    }
  );
};

export const closeApiRequestHandlers = () => {
  ipcMain.removeHandler(API);
};

/* ---------------------------------- types --------------------------------- */
import type { IpcMainInvokeEvent } from 'electron';
import type { DataRequest } from './types';

/* -------------------------------- constants ------------------------------- */
import { API, ERROR_UNSPECIFIED } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcMain } from 'electron';
import { handleCatchAndPrintLog } from './utils';
import { connect } from './connect';

export const startApiRequestHandlers = () => {
  ipcMain.handle(
    API,
    async (_event: IpcMainInvokeEvent, request: DataRequest) => {
      const { action } = request;

      try {
        switch (action) {
          case 'connect': {
            const { queryResult, userFriendlyError } = await connect(request);

            return {
              response: queryResult,
              error: userFriendlyError
            };
          }
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

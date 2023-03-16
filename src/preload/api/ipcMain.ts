/* ---------------------------------- types --------------------------------- */
import type { IpcMainInvokeEvent } from 'electron';
import type { DataRequest } from './types';

/* -------------------------------- constants ------------------------------- */
import { API, ERROR_UNSPECIFIED, ROUTE } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcMain } from 'electron';
import { handleCatchAndPrintLog } from './utils';
import { handleConnect } from './connect';

export const startApiRequestHandlers = () => {
  ipcMain.handle(
    API,
    async (_event: IpcMainInvokeEvent, request: DataRequest) => {
      const { route } = request;
      let result:
        | { error?: Error; userFriendlyError?: string; response?: any }
        | undefined;

      try {
        switch (route) {
          case ROUTE.CONNECT: {
            result = await handleConnect(request);
            break;
          }
          default: {
            const error = new Error(`Invalid route: ${route}`);

            result = {
              error,
              userFriendlyError: error.message
            };
          }
        }
      } catch (error) {
        const userFriendlyError = `${ERROR_UNSPECIFIED} while processing the request for ${route}}`;
        result = {
          error: handleCatchAndPrintLog(request, error, userFriendlyError),
          userFriendlyError
        };
      }

      const { error, userFriendlyError, ...response } = result;

      return {
        response,
        ...(userFriendlyError && { error: userFriendlyError })
      };
    }
  );
};

export const closeApiRequestHandlers = () => {
  ipcMain.removeHandler(API);
};

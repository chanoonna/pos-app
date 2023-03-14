/* ---------------------------------- types --------------------------------- */
import type { IpcMainEvent } from 'electron';
import type { ResponseChannel, Method, Route } from './types';

/* -------------------------------- constants ------------------------------- */
import { API, ERROR_UNSPECIFIED, ROUTE } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcMain } from 'electron';
import { handleCatchAndPrintLog } from './utils';
import { handleConnect } from './connect';

export const startDatabaseListeners = () => {
  ipcMain.on(
    API,
    async (
      event: IpcMainEvent,
      responseChannel: ResponseChannel,
      request: {
        method: Method;
        route: Route;
        params: {
          requestAction: string;
          [key: string]: any;
        };
      }
    ) => {
      const { route, params } = request;
      let result:
        | { error?: Error; userFriendlyError?: string; [key: string]: any }
        | undefined;

      try {
        switch (route) {
          case ROUTE.CONNECT: {
            result = await handleConnect();
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
        result = {
          error: handleCatchAndPrintLog(error, params.requestAction),
          userFriendlyError: `${ERROR_UNSPECIFIED} while processing ${params.requestAction}`
        };
      }

      const { error, userFriendlyError, ...response } = result;

      event.reply(responseChannel, {
        requestParams: params,
        response,
        ...(userFriendlyError && { error: userFriendlyError })
      });
    }
  );
};

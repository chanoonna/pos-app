/* ---------------------------------- types --------------------------------- */
import type { IpcMainEvent } from 'electron';
import type { ResponseChannel, Method, Route } from './types';

/* -------------------------------- constants ------------------------------- */
import { API, ERROR_UNSPECIFIED, ROUTE } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcMain } from 'electron';
import { handleCatchAndPrintLog } from './utils';
import { connect } from './connect';

export const startDatabaseListeners = () => {
  ipcMain.on(
    API,
    async (
      event: IpcMainEvent,
      responseChannel: ResponseChannel,
      request: {
        method: Method;
        route: Route;
        body: {
          requestAction: string;
          [key: string]: any;
        };
      }
    ) => {
      const { route, body } = request;
      let result:
        | { error?: Error; userFriendlyError?: string; [key: string]: any }
        | undefined;

      try {
        switch (route) {
          case ROUTE.CONNECT: {
            result = await connect();
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
          error: handleCatchAndPrintLog(error, body.requestAction),
          userFriendlyError: `${ERROR_UNSPECIFIED} while processing ${body.requestAction}`
        };
      }

      const { error, userFriendlyError, ...response } = result;

      event.reply(responseChannel, {
        requestBody: body,
        response,
        ...(userFriendlyError && { error: userFriendlyError })
      });
    }
  );
};

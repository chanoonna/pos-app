/* ---------------------------------- types --------------------------------- */
import type { IpcMainEvent } from 'electron';
import type { ResponseChannel, Method, Route } from './types';

/* -------------------------------- constants ------------------------------- */
import { API_MAIN } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcMain } from 'electron';
import { printRequestLog, printResponseLog } from './utils';
import { appStartupListener } from './listeners';

export const startDatabaseListeners = () => {
  appStartupListener();

  ipcMain.on(
    API_MAIN,
    async (
      event: IpcMainEvent,
      {
        method,
        route,
        body,
        responseChannel
      }: {
        method: Method;
        route: Route;
        body: {
          requestAction: string;
          [key: string]: any;
        };
        responseChannel: ResponseChannel;
      }
    ) => {
      printRequestLog({ method, route, body });

      switch (route) {
        default: {
          event.reply(responseChannel, {
            requestBody: body,
            error: Error(`Invalid route: ${route}`)
          });
        }
      }
    }
  );
};

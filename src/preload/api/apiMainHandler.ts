/* ---------------------------------- types --------------------------------- */
import type { IpcMainEvent } from 'electron';
import type { ResponseChannel, Method, Route } from './types';

/* -------------------------------- constants ------------------------------- */
import {
  API_MAIN,
  API_RESPONSE_CHANNEL,
  API_CONNECT,
  ROUTE,
  UNSPECIFIED_ERROR,
  CONNECT_DB
} from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcMain } from 'electron';
import { connectDatabase } from './connect';
import { printRequestLog, printResponseLog } from './utils';

export const initiateDatabase = () => {
  ipcMain.once(API_CONNECT, async (event: IpcMainEvent) => {
    let result: { error?: Error | null } | undefined;
    const requestAction = CONNECT_DB;
    printRequestLog({ body: { requestAction } });

    try {
      result = await connectDatabase();
    } catch (error) {
      if (error instanceof Error) {
        result = { error };
      } else {
        result = { error: new Error(UNSPECIFIED_ERROR) };
      }
    }

    printResponseLog({ body: { requestAction }, ...result });
    event.reply(API_RESPONSE_CHANNEL.DB_INITIALIZATION, {
      requestBody: { requestAction },
      ...result
    });
  });

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

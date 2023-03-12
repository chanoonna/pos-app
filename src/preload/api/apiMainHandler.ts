/* ---------------------------------- types --------------------------------- */
import type { IpcMainEvent } from 'electron';
import type { DatabaseChannel, Method, Route } from './types';

/* -------------------------------- constants ------------------------------- */
import { API_MAIN, ROUTE } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcMain } from 'electron';
import { handleInitialization } from './handlers/initialization';

export const initiateDatabase = () => {
  ipcMain.on(
    API_MAIN,
    async (
      event: IpcMainEvent,
      {
        method,
        route,
        body: _body,
        channel
      }: {
        method: Method;
        route: Route;
        body: {
          requestAction: string;
        } & any;
        channel: DatabaseChannel;
      }
    ) => {
      const { requestAction, ...body } = _body;
      console.log(`REQUEST: ${method} ${route} ${body.requestAction}\n`, body);

      switch (route) {
        case ROUTE.INITIALIZATION: {
          handleInitialization(event, { method, requestAction, body });
          break;
        }

        default: {
          event.reply(channel, {
            requestAction,
            error: Error('Invalid route')
          });
        }
      }
    }
  );
};

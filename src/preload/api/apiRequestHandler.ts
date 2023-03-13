/* ---------------------------------- types --------------------------------- */
import type { BaseListener, Method, ResponseChannel, Route } from './types';

/* -------------------------------- constants ------------------------------- */
import { API_STARTUP, API_MAIN } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcRenderer } from 'electron';

export const apiRequestHandler = {
  request: <T, V extends { requestAction: T }>(
    responseChannel: ResponseChannel,
    { method, route, body }: { method: Method; route: Route; body: V }
  ) => {
    ipcRenderer.send(API_MAIN, {
      method,
      route,
      body,
      responseChannel
    });
  },
  on: <T extends BaseListener>(
    responseChannel: ResponseChannel,
    listener: T
  ) => {
    ipcRenderer.on(responseChannel, listener);

    return () => {
      ipcRenderer.removeListener(responseChannel, listener);
    };
  },
  off: <T extends BaseListener>(
    responseChannel: ResponseChannel,
    listener: T
  ) => {
    ipcRenderer.removeListener(responseChannel, listener);
  }
};

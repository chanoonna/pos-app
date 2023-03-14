/* ---------------------------------- types --------------------------------- */
import type { BaseListener, Method, ResponseChannel, Route } from './types';

/* -------------------------------- constants ------------------------------- */
import { API, API_RESPONSE_CHANNEL, DB_CONNECT, ROUTE } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcRenderer } from 'electron';

export const apiRequestHandler = {
  connect: () => {
    ipcRenderer.send(API, API_RESPONSE_CHANNEL.DB_STARTUP, {
      route: ROUTE.CONNECT,
      params: { requestAction: DB_CONNECT }
    });
  },
  request: <T, V extends { requestAction: T }>(
    responseChannel: ResponseChannel,
    { method, route, params }: { method: Method; route: Route; params: V }
  ) => {
    ipcRenderer.send(API, responseChannel, {
      method,
      route,
      params
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

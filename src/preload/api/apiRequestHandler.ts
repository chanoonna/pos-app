/* ---------------------------------- types --------------------------------- */
import type { BaseListener, Method, ResponseChannel, Route } from './types';

/* -------------------------------- constants ------------------------------- */
import { API_CONNECT, API_MAIN, METHOD, ROUTE } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcRenderer } from 'electron';

export const apiRequestHandler = {
  connect: () => {
    ipcRenderer.send(API_CONNECT);
  },
  request: <T, V extends { requestAction: T }, S extends string>(
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
  off: <T extends BaseListener, S extends string>(
    responseChannel: ResponseChannel,
    listener: T
  ) => {
    ipcRenderer.removeListener(responseChannel, listener);
  }
};

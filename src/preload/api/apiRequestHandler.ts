/* ---------------------------------- types --------------------------------- */
import type { BaseListener } from './types';

/* -------------------------------- constants ------------------------------- */
import { API_MAIN, METHOD, ROUTE } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcRenderer } from 'electron';

export const apiRequestHandler = {
  request: <T, V extends { requestAction: T }, S extends string>(
    channel: S,
    { body }: { body: V }
  ) => {
    ipcRenderer.send(API_MAIN, {
      method: METHOD.POST,
      route: ROUTE.INITIALIZATION,
      body,
      channel
    });
  },
  on: <T extends BaseListener, S extends string>(channel: S, listener: T) => {
    ipcRenderer.on(channel, listener);

    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  },
  off: <T extends BaseListener, S extends string>(channel: S, listener: T) => {
    ipcRenderer.removeListener(channel, listener);
  }
};

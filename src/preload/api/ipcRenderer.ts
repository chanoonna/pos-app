/* ---------------------------------- types --------------------------------- */
import type { RequestAction, RequestResponse } from './types';

/* -------------------------------- constants ------------------------------- */
import { API } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcRenderer } from 'electron';

export const apiRequestHandler = {
  request: async <T = undefined, V = undefined>(request: RequestAction<T>) =>
    ipcRenderer.invoke(API, request) as Promise<RequestResponse<V>>
};

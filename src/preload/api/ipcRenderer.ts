/* ---------------------------------- types --------------------------------- */
import type { DataRequest, DataResponse } from './types';

/* -------------------------------- constants ------------------------------- */
import { API } from './constants';

/* --------------------------------- imports -------------------------------- */
import { ipcRenderer } from 'electron';

export const apiRequestHandler = {
  request: async <T = undefined, V = undefined>(request: DataRequest<T>) =>
    ipcRenderer.invoke(API, request) as Promise<DataResponse<V>>
};

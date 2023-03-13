import { contextBridge } from 'electron';
import { apiRequestHandler } from './api/apiRequestHandler';
import { apiAppStartupHandler } from './api/apiAppStartupHandler';

const apiHandler = {
  main: apiRequestHandler,
  startup: apiAppStartupHandler
};
contextBridge.exposeInMainWorld('api', apiHandler);

export type ApiHandler = typeof apiHandler;

import { contextBridge } from 'electron';
import { apiRequestHandler } from './api/ipcRenderer';

contextBridge.exposeInMainWorld('api', apiRequestHandler);

export type ApiHandler = typeof apiRequestHandler;

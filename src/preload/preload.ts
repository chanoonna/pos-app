import { contextBridge } from 'electron';
import { apiRequestHandler } from './api/apiRequestHandler';

contextBridge.exposeInMainWorld('api', apiRequestHandler);

export type ApiRequestHandler = typeof apiRequestHandler;

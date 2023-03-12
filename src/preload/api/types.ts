import type { IpcRendererEvent } from 'electron';
import { API_CHANNEL, METHOD, ROUTE, EXECUTION_RESULT } from './constants';

export type DatabaseChannel = keyof typeof API_CHANNEL;
export type Method = keyof typeof METHOD;
export type Route = (typeof ROUTE)[keyof typeof ROUTE];

export type BaseListener = (_event: IpcRendererEvent, ...args: any[]) => void;

export interface ExecutionResult<T = unknown> {
  log?: string;
  response?: T;
  error?: Error;
}

export interface RequestResponse<T = unknown> {
  log?: string;
  result: keyof typeof EXECUTION_RESULT;
  response?: T;
  error?: Error;
}

export interface AsyncDB {
  run: <T>(
    executionLog: string,
    query: string,
    params?: string[]
  ) => Promise<RequestResponse<T>>;
  get: <T>(
    executionLog: string,
    query: string,
    params?: string[]
  ) => Promise<RequestResponse<T>>;
}

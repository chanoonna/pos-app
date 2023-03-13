import type { IpcRendererEvent } from 'electron';
import {
  API_RESPONSE_CHANNEL,
  METHOD,
  ROUTE,
  REQUEST_RESULT
} from './constants';

export type ResponseChannel = keyof typeof API_RESPONSE_CHANNEL;
export type Method = keyof typeof METHOD;
export type Route = (typeof ROUTE)[keyof typeof ROUTE];

export type BaseListener = (_event: IpcRendererEvent, ...args: any[]) => void;

export interface Request<T extends { requestAction: string }> {
  method?: Method;
  route?: Route;
  Params: T;
}

export interface Response<
  ResponseType = unknown,
  ErrorType = unknown,
  ParamType = unknown
> {
  result: keyof typeof REQUEST_RESULT;
  response?: ResponseType;
  error?: ErrorType;
  requestParams: { requestAction: string } & ParamType;
}

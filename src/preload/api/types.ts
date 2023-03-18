import { API_RESPONSE_CHANNEL, ROUTE, SORT_ASC, SORT_DESC } from './constants';

export type ResponseChannel = keyof typeof API_RESPONSE_CHANNEL;
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type Route = (typeof ROUTE)[keyof typeof ROUTE];

export type DataRequest<T = undefined> = T extends undefined
  ? {
      route: Route;
      method: Method;
      params?: any;
    }
  : {
      route: Route;
      method: Method;
      params: T;
    };

export type DataResponse<T = undefined> = T extends undefined
  ? {
      response?: any;
      error?: Error;
    }
  : {
      response: T;
      error?: Error;
    };

export type SortAttribute<T> = [T, typeof SORT_ASC | typeof SORT_DESC][];

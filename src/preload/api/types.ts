import { SORT_ASC, SORT_DESC } from './constants';

export type Action =
  | 'connect'
  | 'checkTables'
  | 'createTables'
  | 'getLastLoggedInUser'
  | 'createUser'
  | 'getUsers'
  | 'getSettings'
  | 'updateSettings'
  | 'getStoreInfo'
  | 'updateStoreInfo'
  | 'login';

export type RequestAction<T = undefined> = T extends undefined
  ? {
      action: Action;
      params?: any;
    }
  : {
      action: Action;
      params: T;
    };

export type RequestResult<T = undefined> = T extends undefined
  ? {
      result?: never;
      error?: Error;
      userFriendlyError?: string;
    }
  : {
      result: T;
      error?: Error;
      userFriendlyError?: string;
    };

export type RequestResponse<T = undefined> = T extends undefined
  ? {
      response?: never;
      error?: string;
    }
  : {
      response: T;
      error?: string;
    };

export type SortAttribute<T> = [T, typeof SORT_ASC | typeof SORT_DESC][];

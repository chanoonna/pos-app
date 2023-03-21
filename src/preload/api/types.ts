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
      result?: any;
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
      response?: any;
      error?: Error;
    }
  : {
      response: T;
      error?: Error;
    };

export type SortAttribute<T> = [T, typeof SORT_ASC | typeof SORT_DESC][];

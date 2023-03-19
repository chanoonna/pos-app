import { SORT_ASC, SORT_DESC } from './constants';

export type Action =
  | 'connect'
  | 'checkTables'
  | 'createTables'
  | 'getLastLoggedInUser'
  | 'createUser'
  | 'getUsers'
  | 'login';

export type DataRequest<T = undefined> = T extends undefined
  ? {
      action: Action;
      params?: any;
    }
  : {
      action: Action;
      params: T;
    };

export type QueryResult<T = undefined> = T extends undefined
  ? {
      queryResult?: any;
      error?: Error;
      userFriendlyError?: string;
    }
  : {
      queryResult: T;
      error?: Error;
      userFriendlyError?: string;
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

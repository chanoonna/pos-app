/* ---------------------------------- types --------------------------------- */
import type {
  CreateUserParamsDB,
  LoginParamsDB,
  UserDB
} from 'preload/api/users/types';
import type { CreateUserParams, LoginParams } from './types';

/* --------------------------------- imports -------------------------------- */

import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */

export const createUser = (params: CreateUserParams) =>
  request<CreateUserParamsDB, UserDB | undefined>({
    action: 'createUser',
    params: {
      username: params.username,
      password: params.password,
      access_level: params.accessLevel
    }
  });

export const login = (params: LoginParams) =>
  request<LoginParamsDB, UserDB | undefined>({
    action: 'login',
    params: {
      username: params.username,
      password: params.password
    }
  });

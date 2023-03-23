/* ---------------------------------- types --------------------------------- */
import type {
  CreateUserParamsDB,
  LoginParamsDB,
  UpdateUserParamsDB,
  UserDB
} from 'preload/api/users/types';
import type { CreateUserParams, LoginParams, UpdateUserParams } from './types';

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

export const updateUser = (params: UpdateUserParams) =>
  request<UpdateUserParamsDB, UserDB | undefined>({
    action: 'updateUser',
    params: {
      id: params.id,
      username: params.username,
      password: params.password,
      is_archived: params.isArchived,
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

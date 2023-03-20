/* ---------------------------------- types --------------------------------- */
import type {
  CreateUserParams,
  LoginParams,
  UserDB
} from 'preload/api/users/types';

/* --------------------------------- imports -------------------------------- */

import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */

export const createUser = (params: CreateUserParams) =>
  request<CreateUserParams, UserDB | undefined>({
    action: 'createUser',
    params
  });

export const login = (params: LoginParams) =>
  request<LoginParams, UserDB | undefined>({ action: 'login', params });

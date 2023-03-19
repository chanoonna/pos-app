/* ---------------------------------- types --------------------------------- */

import type { User } from 'models/user';
import type { CreateUserParams, LoginParams } from 'preload/api/users/types';

/* --------------------------------- imports -------------------------------- */

import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */

export const createUser = (params: CreateUserParams) =>
  request<CreateUserParams, User | undefined>({ action: 'createUser', params });

export const login = (params: LoginParams) =>
  request<LoginParams, User | undefined>({ action: 'login', params });

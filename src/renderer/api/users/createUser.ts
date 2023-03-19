/* ---------------------------------- types --------------------------------- */

import type { User } from 'models/user';
import type { CreateUserParams } from 'preload/api/users/types';

/* --------------------------------- imports -------------------------------- */

import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */

export const createUser = (params: CreateUserParams) =>
  request<CreateUserParams, User | undefined>({ action: 'createUser', params });

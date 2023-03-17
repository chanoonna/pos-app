/* ---------------------------------- types --------------------------------- */
import type { User } from 'models/user';

/* -------------------------------- constants ------------------------------- */
import { ROUTE } from 'preload/api/constants';

/* --------------------------------- imports -------------------------------- */
import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */
export const connect = () =>
  request<undefined, { lastUser?: User }>({
    method: 'GET',
    route: ROUTE.CONNECT
  });

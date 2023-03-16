/* ---------------------------------- types --------------------------------- */
import type { User } from 'models/user';

/* -------------------------------- constants ------------------------------- */
import { METHOD, ROUTE } from 'preload/api/constants';

/* --------------------------------- imports -------------------------------- */
import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */
export const connect = () =>
  request<undefined, { lastUser?: User }>({
    method: METHOD.GET,
    route: ROUTE.CONNECT
  });

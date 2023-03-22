/* ---------------------------------- types --------------------------------- */
import type { UserDB } from 'preload/api/users/types';

/* --------------------------------- imports -------------------------------- */
import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */
export const connectToMain = () =>
  request<undefined, UserDB>({ action: 'connect' });

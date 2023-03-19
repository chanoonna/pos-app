/* ---------------------------------- types --------------------------------- */
import type { User } from 'models/user';

/* --------------------------------- imports -------------------------------- */
import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */
export const connectToMain = () =>
  request<undefined, User | undefined>({ action: 'connect' });

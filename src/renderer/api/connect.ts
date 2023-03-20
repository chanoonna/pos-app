/* ---------------------------------- types --------------------------------- */
import type { User } from 'renderer/models';

/* --------------------------------- imports -------------------------------- */
import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */
export const connectToMain = () =>
  request<undefined, User | undefined>({ action: 'connect' });

/* -------------------------------- constants ------------------------------- */
import {
  CONNECT_DB,
  CLOSE_DB,
  CREATE_TABLES,
  REGISTER_ADMIN,
  CHECK_TABLE_EXISTENCE
} from 'preload/api/constants';

import { createRequestTypeMap } from '../utils';

/* -------------------------- Request Action Types -------------------------- */

export const CONNECT_DB_ACTION = createRequestTypeMap(CONNECT_DB);
export const CLOSE_DB_ACTION = createRequestTypeMap(CLOSE_DB);
export const CREATE_TABLES_ACTION = createRequestTypeMap(CREATE_TABLES);
export const REGISTER_ADMIN_ACTION = createRequestTypeMap(REGISTER_ADMIN);
export const CHECK_TABLE_EXISTENCE_ACTION = createRequestTypeMap(
  CHECK_TABLE_EXISTENCE
);

export const INITIALIZATION_REQUEST = {
  [CONNECT_DB]: CONNECT_DB_ACTION,
  [CLOSE_DB]: CLOSE_DB_ACTION,
  [CREATE_TABLES]: CREATE_TABLES_ACTION,
  [REGISTER_ADMIN]: REGISTER_ADMIN_ACTION,
  [CHECK_TABLE_EXISTENCE]: CHECK_TABLE_EXISTENCE_ACTION
} as const;

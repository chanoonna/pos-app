import { createRequestTypeMap } from '../utils';

export const CONNECT_DB = 'CONNECT_DB';
export const CREATE_TABLES = 'CREATE_TABLES';
export const REGISTER_ADMIN = 'REGISTER_ADMIN';

/* -------------------------- Request Action Types -------------------------- */

export const CONNECT_DB_MAP = createRequestTypeMap('CONNECT_DB');
export const CREATE_TABLES_MAP = createRequestTypeMap('CREATE_TABLES');
export const REGISTER_ADMIN_MAP = createRequestTypeMap('REGISTER_ADMIN');

export const INITIALIZATION_REQUEST = {
  [CONNECT_DB]: CONNECT_DB_MAP,
  [CREATE_TABLES]: CREATE_TABLES_MAP,
  [REGISTER_ADMIN]: REGISTER_ADMIN_MAP
} as const;

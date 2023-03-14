/* -------------------------------- constants ------------------------------- */
import { DB_CONNECT } from 'preload/api/constants';
import { DB_REGISTER_ADMIN } from 'preload/api/connect/constants';
import { DB_GET_LOGIN_ACTIVITIES } from 'preload/api/loginActivities/constants';

/* --------------------------------- imports -------------------------------- */
import { createRequestTypeMap } from '../utils';

export const SET_LANGUAGE = 'SET_LANGUAGE' as const;

export const DB_CONNECT_ACTION = createRequestTypeMap(DB_CONNECT);
export const DB_REGISTER_ADMIN_ACTION = createRequestTypeMap(DB_REGISTER_ADMIN);
export const DB_GET_LOGIN_ACTIVITIES_ACTION = createRequestTypeMap(
  DB_GET_LOGIN_ACTIVITIES
);

export const APP_STARTUP_REQUEST = {
  [DB_CONNECT]: DB_CONNECT_ACTION,
  [DB_REGISTER_ADMIN]: DB_REGISTER_ADMIN_ACTION,
  [DB_GET_LOGIN_ACTIVITIES]: DB_GET_LOGIN_ACTIVITIES_ACTION
} as const;

/* -------------------------------- constants ------------------------------- */
import { DB_CONNECT } from 'preload/api/constants';
import { DB_REGISTER_ADMIN } from 'preload/api/connect/constants';
import { DB_GET_LOGIN_ACTIVITIES } from 'preload/api/loginActivities/constants';
import {
  DB_CONNECT_ACTION,
  DB_REGISTER_ADMIN_ACTION,
  DB_GET_LOGIN_ACTIVITIES_ACTION
} from './constants';
import { Language } from 'SettingsModule/types';

/* -------------------------- Initialization State -------------------------- */

export interface AppStartupState {
  isDatabaseConnected: boolean;
  isDatabaseConnecting: boolean;
  isDatabaseConnectionFailed: boolean;
  isDatabaseReady: boolean;
  isAdminRegistered: boolean;
  isAdminRegistering: boolean;
  isAdminRegistrationFailed: boolean;
  isGettingLoginActivities: boolean;
  lsatLoggedInUser?: {
    id: number;
    username: string;
    date: string;
  };
  lastUserSetting?: {
    language: Language;
  };
}

/* ---------------------- Initialization Request Action --------------------- */
export type ConnectDatabaseRequest =
  | typeof DB_CONNECT
  | typeof DB_REGISTER_ADMIN
  | typeof DB_GET_LOGIN_ACTIVITIES;

/* ----------------------- Initialization Action Types ---------------------- */

type ConnectDatabaseRequestActionType =
  (typeof DB_CONNECT_ACTION)[keyof typeof DB_CONNECT_ACTION];
type RegisterAdminRequestActionType =
  (typeof DB_REGISTER_ADMIN_ACTION)[keyof typeof DB_REGISTER_ADMIN_ACTION];
type GetLoginActivitiesRequestActionType =
  (typeof DB_GET_LOGIN_ACTIVITIES_ACTION)[keyof typeof DB_GET_LOGIN_ACTIVITIES_ACTION];

/* ------------------------- Initialization Actions ------------------------- */

interface ConnectDatabaseRequestAction {
  type: ConnectDatabaseRequestActionType;
  payload?: {
    error?: Error;
    response?: {
      isDatabaseReady: boolean;
    };
  };
}

interface GetLoginActivitiesAction {
  type: GetLoginActivitiesRequestActionType;
  payload?: {
    error?: Error;
    params?: {
      limit?: number;
      offset?: number;
    };
    response?: {
      loginActivities?: { username: string; date: string; id: number }[];
    };
  };
}

interface RegisterAdminRequestAction {
  type: RegisterAdminRequestActionType;
  payload?: {
    error?: Error;
    response?: any;
  };
}

export type AppStartupRequestAction =
  | ConnectDatabaseRequestAction
  | GetLoginActivitiesAction
  | RegisterAdminRequestAction;

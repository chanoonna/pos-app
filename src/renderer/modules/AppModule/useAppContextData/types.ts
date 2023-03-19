/* ---------------------------------- types --------------------------------- */
import type { User } from 'models/user';
import type { AppPage } from 'modules/types';
import type { CreateUserParams, UserDB } from 'preload/api/users/types';

/* -------------------------------- constants ------------------------------- */
import { CONNECT, CREATE_ADMIN, NAVIGATE_TO, LOGOUT, LOGIN } from './constants';

/* ------------------------------------ - ----------------------------------- */

export interface AppContextDataState {
  user?: User;
  isLoggingIn: boolean;
  isLoggingInError: boolean;
  isAuthenticated: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  isConnectedError: boolean;
  isCreatingAdmin: boolean;
  isCreatingAdminError: boolean;
  currentPage: AppPage;
}

export type AppContextDataActionType =
  | (typeof CONNECT)[keyof typeof CONNECT]
  | typeof NAVIGATE_TO;

export type AppContextDataAction =
  | ConnectRequestAction
  | ConnectSuccessAction
  | ConnectFailureAction
  | CreateAdminRequestAction
  | CreateAdminSuccessAction
  | CreateAdminFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | NavigateToAction
  | LogoutAction;

/* --------------------------------- CONNECT -------------------------------- */
interface ConnectRequestAction {
  type: typeof CONNECT.REQUEST;
}
interface ConnectSuccessAction {
  type: typeof CONNECT.SUCCESS;
  payload: { response?: UserDB };
}
interface ConnectFailureAction {
  type: typeof CONNECT.FAILURE;
  payload: { error: Error };
}

/* ------------------------------ CREATE_ADMIN ------------------------------ */
interface CreateAdminRequestAction {
  type: typeof CREATE_ADMIN.REQUEST;
  payload: { params: CreateUserParams };
}
interface CreateAdminSuccessAction {
  type: typeof CREATE_ADMIN.SUCCESS;
}
interface CreateAdminFailureAction {
  type: typeof CREATE_ADMIN.FAILURE;
  payload: { error: Error };
}

/* ---------------------------------- LOGIN --------------------------------- */
interface LoginRequestAction {
  type: typeof LOGIN.REQUEST;
}
interface LoginSuccessAction {
  type: typeof LOGIN.SUCCESS;
  payload: { response: UserDB };
}
interface LoginFailureAction {
  type: typeof LOGIN.FAILURE;
  payload: { error: Error };
}

/* ------------------------------- NAVIGATE_TO ------------------------------ */
interface NavigateToAction {
  type: typeof NAVIGATE_TO;
  payload: { nextPage: AppPage };
}

/* --------------------------------- LOGOUT --------------------------------- */
interface LogoutAction {
  type: typeof LOGOUT;
}

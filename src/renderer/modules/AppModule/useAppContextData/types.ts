/* ---------------------------------- types --------------------------------- */
import type { User } from 'models/user';
import type { AppPage } from 'modules/types';
import type { CreateUserParams } from 'preload/api/users/types';

/* -------------------------------- constants ------------------------------- */
import { CONNECT, CREATE_ADMIN, NAVIGATE_TO, LOGOUT } from './constants';

/* ------------------------------------ - ----------------------------------- */

export interface AppContextDataState {
  user?: User;
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
  | NavigateToAction
  | LogoutAction;

/* --------------------------------- CONNECT -------------------------------- */
interface ConnectRequestAction {
  type: typeof CONNECT.REQUEST;
}
interface ConnectSuccessAction {
  type: typeof CONNECT.SUCCESS;
  payload: { response?: User };
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
  payload: { response: User[] };
}
interface CreateAdminFailureAction {
  type: typeof CREATE_ADMIN.FAILURE;
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

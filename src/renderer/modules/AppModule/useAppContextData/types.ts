/* ---------------------------------- types --------------------------------- */
import type { User } from 'models/user';
import type { AppPage } from 'modules/types';

/* -------------------------------- constants ------------------------------- */
import { CONNECT, NAVIGATE_TO, LOGOUT } from './constants';

/* ------------------------------------ - ----------------------------------- */

export interface AppContextDataState {
  user?: User;
  isAuthenticated: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  isConnectedError: boolean;
  currentPage: AppPage;
}

export type AppContextDataActionType =
  | (typeof CONNECT)[keyof typeof CONNECT]
  | typeof NAVIGATE_TO;

export type AppContextDataAction =
  | ConnectRequestAction
  | ConnectSuccessAction
  | ConnectFailureAction
  | NavigateToAction
  | LogoutAction;

/* --------------------------------- CONNECT -------------------------------- */
interface ConnectRequestAction {
  type: typeof CONNECT.REQUEST;
}
interface ConnectSuccessAction {
  type: typeof CONNECT.SUCCESS;
  payload: { response: { lastUser?: User } };
}
interface ConnectFailureAction {
  type: typeof CONNECT.FAILURE;
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

/* ---------------------------------- types --------------------------------- */
import type { User, Settings, StoreInfo } from 'models';
import type { AppPage } from 'modules/types';
import type { CreateUserParams, UserDB } from 'preload/api/users/types';

/* -------------------------------- constants ------------------------------- */
import {
  CONNECT,
  CREATE_ADMIN,
  NAVIGATE_TO,
  LOGOUT,
  LOGIN,
  GET_SETTINGS,
  UPDATE_SETTINGS,
  SET_SETTINGS_MODAL_OPEN,
  GET_STORE_INFO,
  UPDATE_STORE_INFO
} from './constants';
import { SettingsDB, StoreInfoDB } from 'preload/api/settings/types';

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

  /* Settings state */
  settingsState: {
    isSettingsModalOpen: boolean;
  } & Settings &
    StoreInfo;
}

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
  | GetSettingsRequestAction
  | GetSettingsSuccessAction
  | GetSettingsFailureAction
  | UpdateSettingsRequestAction
  | UpdateSettingsSuccessAction
  | UpdateSettingsFailureAction
  | GetStoreInfoRequestAction
  | GetStoreInfoSuccessAction
  | GetStoreInfoFailureAction
  | UpdateStoreInfoRequestAction
  | UpdateStoreInfoSuccessAction
  | UpdateStoreInfoFailureAction
  | NavigateToAction
  | LogoutAction
  | SetSettingsModalOpenAction;

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

/* --------------------------------- LOGOUT --------------------------------- */
interface LogoutAction {
  type: typeof LOGOUT;
}

/* ------------------------------- NAVIGATE_TO ------------------------------ */
interface NavigateToAction {
  type: typeof NAVIGATE_TO;
  payload: { nextPage: AppPage };
}

/* ------------------------------ GET_SETTINGS ------------------------------ */
interface GetSettingsRequestAction {
  type: typeof GET_SETTINGS.REQUEST;
}
interface GetSettingsSuccessAction {
  type: typeof GET_SETTINGS.SUCCESS;
  payload: {
    response: SettingsDB;
  };
}
interface GetSettingsFailureAction {
  type: typeof GET_SETTINGS.FAILURE;
  payload: {
    error: Error;
  };
}

/* ----------------------------- UPDATE_SETTINGS ---------------------------- */
interface UpdateSettingsRequestAction {
  type: typeof UPDATE_SETTINGS.REQUEST;
}
interface UpdateSettingsSuccessAction {
  type: typeof UPDATE_SETTINGS.SUCCESS;
  payload: {
    response: SettingsDB;
  };
}
interface UpdateSettingsFailureAction {
  type: typeof UPDATE_SETTINGS.FAILURE;
  payload: {
    error: Error;
  };
}

/* ----------------------------- GET_STORE_INFO ----------------------------- */
interface GetStoreInfoRequestAction {
  type: typeof GET_STORE_INFO.REQUEST;
}
interface GetStoreInfoSuccessAction {
  type: typeof GET_STORE_INFO.SUCCESS;
  payload: {
    response: StoreInfoDB;
  };
}
interface GetStoreInfoFailureAction {
  type: typeof GET_STORE_INFO.FAILURE;
  payload: {
    error: Error;
  };
}

/* ---------------------------- UPDATE_STORE_INFO --------------------------- */
interface UpdateStoreInfoRequestAction {
  type: typeof UPDATE_STORE_INFO.REQUEST;
}
interface UpdateStoreInfoSuccessAction {
  type: typeof UPDATE_STORE_INFO.SUCCESS;
  payload: {
    response: StoreInfoDB;
  };
}
interface UpdateStoreInfoFailureAction {
  type: typeof UPDATE_STORE_INFO.FAILURE;
  payload: {
    error: Error;
  };
}

/* ---------------------------- SET_SETTINGS_MODAL_OPEN --------------------- */
interface SetSettingsModalOpenAction {
  type: typeof SET_SETTINGS_MODAL_OPEN;
  payload: {
    isSettingsModalOpen: boolean;
  };
}

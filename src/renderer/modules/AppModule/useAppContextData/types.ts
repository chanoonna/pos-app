/* ---------------------------------- types --------------------------------- */
import type { User, Settings, StoreInfo } from 'models';
import type { AppPage } from 'modules/types';
import type { UserDB } from 'preload/api/users/types';

/* -------------------------------- constants ------------------------------- */
import {
  CONNECT,
  CREATE_USER,
  UPDATE_USER,
  NAVIGATE_TO,
  LOGOUT,
  LOGIN,
  GET_SETTINGS,
  UPDATE_SETTINGS,
  SET_SETTINGS_MODAL_OPEN,
  GET_STORE_INFO,
  UPDATE_STORE_INFO,
  SET_MY_INFO_MODAL_OPEN,
  UPDATE_ME
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
  settingsState: Settings;

  /* StoreInfo state */
  storeInfoState: StoreInfo;

  /* Modal state */
  modalState: {
    isSettingsModalOpen: boolean;
    isMyInfoModalOpen: boolean;
  };
}

export type AppContextDataAction =
  | ConnectRequestAction
  | ConnectSuccessAction
  | ConnectFailureAction
  | CreateUserRequestAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | UpdateMeRequestAction
  | UpdateMeSuccessAction
  | UpdateMeFailureAction
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
  | SetSettingsModalOpenAction
  | SetMyInfoModalOpenAction;

/* --------------------------------- CONNECT -------------------------------- */
interface ConnectRequestAction {
  type: typeof CONNECT.REQUEST;
}
interface ConnectSuccessAction {
  type: typeof CONNECT.SUCCESS;
  payload?: {
    response?: UserDB;
  };
}
interface ConnectFailureAction {
  type: typeof CONNECT.FAILURE;
  payload: { error: string };
}

/* ------------------------------- CREATE_USER ------------------------------ */
interface CreateUserRequestAction {
  type: typeof CREATE_USER.REQUEST;
}
interface CreateUserSuccessAction {
  type: typeof CREATE_USER.SUCCESS;
}
interface CreateUserFailureAction {
  type: typeof CREATE_USER.FAILURE;
  payload: { error: string };
}

/* ------------------------------- UPDATE_USER ------------------------------ */
interface UpdateUserRequestAction {
  type: typeof UPDATE_USER.REQUEST;
}
interface UpdateUserSuccessAction {
  type: typeof UPDATE_USER.SUCCESS;
  payload: { response: UserDB };
}
interface UpdateUserFailureAction {
  type: typeof UPDATE_USER.FAILURE;
  payload: { error: string };
}

/* -------------------------------- UPDATE_ME ------------------------------- */
interface UpdateMeRequestAction {
  type: typeof UPDATE_ME.REQUEST;
}
interface UpdateMeSuccessAction {
  type: typeof UPDATE_ME.SUCCESS;
  payload: { response: UserDB };
}
interface UpdateMeFailureAction {
  type: typeof UPDATE_ME.FAILURE;
  payload: { error: string };
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
  payload: { error: string };
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
    error: string;
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
    error: string;
  };
}

/* ---------------------------- SET_SETTINGS_MODAL_OPEN --------------------- */
interface SetSettingsModalOpenAction {
  type: typeof SET_SETTINGS_MODAL_OPEN;
  payload: {
    isSettingsModalOpen: boolean;
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
    error: string;
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
    error: string;
  };
}

/* ------------------------- SET_MY_INFO_MODAL_OPEN ------------------------- */
interface SetMyInfoModalOpenAction {
  type: typeof SET_MY_INFO_MODAL_OPEN;
  payload: {
    isMyInfoModalOpen: boolean;
  };
}

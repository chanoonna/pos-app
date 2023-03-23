/* --------------------------------- imports -------------------------------- */
import { createRequestActionMap } from 'api/utils';

/* ----------------------------- Request actions ---------------------------- */
export const CONNECT = createRequestActionMap('CONNECT');
export const CREATE_ADMIN = createRequestActionMap('CREATE_ADMIN');
export const LOGIN = createRequestActionMap('LOGIN');
export const GET_SETTINGS = createRequestActionMap('GET_SETTINGS');
export const UPDATE_SETTINGS = createRequestActionMap('UPDATE_SETTINGS');
export const GET_STORE_INFO = createRequestActionMap('GET_STORE_INFO');
export const UPDATE_STORE_INFO = createRequestActionMap('UPDATE_STORE_INFO');

/* --------------------------- Non-request actions -------------------------- */
export const LOGOUT = 'LOGOUT' as const;
export const NAVIGATE_TO = 'NAVIGATE_TO' as const;
export const SET_INITIAL_LANGUAGE = 'SET_INITIAL_LANGUAGE' as const;
export const SET_SETTINGS_MODAL_OPEN = 'SET_SETTINGS_MODAL_OPEN' as const;
export const SET_MY_INFO_MODAL_OPEN = 'SET_MY_INFO_MODAL_OPEN' as const;

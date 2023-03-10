import { Module } from 'modules/types';
import { Language } from 'SettingsModule/types';

export interface AppDataState {
  auth: {
    isAuthenticating: boolean;
    isAuthenticated: boolean;
  };
  user?: {
    id: number;
    name: string;
  };
  currentModule: Module;
  language: Language;
}

export enum AppDataActionType {
  SetAuthenticating = 'SET_AUTHENTICATING',
  SetAuthenticated = 'SET_AUTHENTICATED',
  NavigateTo = 'NAVIGATE_TO',
  SetLanguage = 'SET_LANGUAGE',
  LogOut = 'LOG_OUT'
}

export type AppDataAction =
  | SetAuthenticatingAction
  | SetAuthenticatedAction
  | SetLanguageAction
  | NavigateToAction
  | LogOutAction;

export interface SetAuthenticatingAction {
  type: AppDataActionType.SetAuthenticating;
  payload: {
    isAuthenticating: boolean;
  };
}

export interface SetAuthenticatedAction {
  type: AppDataActionType.SetAuthenticated;
  payload: {
    isAuthenticated: boolean;
  };
}

export interface NavigateToAction {
  type: AppDataActionType.NavigateTo;
  payload: {
    module: Module;
  };
}

export interface SetLanguageAction {
  type: AppDataActionType.SetLanguage;
  payload: {
    language: Language;
  };
}

export interface LogOutAction {
  type: AppDataActionType.LogOut;
  payload: { isAuthenticated: false; user: undefined };
}

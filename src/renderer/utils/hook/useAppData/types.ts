import { Module } from 'modules/types';
import { Language } from 'renderer/modules/SettingsModule/types';

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
  NavigateTo = 'NAVIGATE_TO'
}

export type AppDataAction =
  | SetAuthenticatingAction
  | SetAuthenticatedAction
  | NavigateToAction;

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

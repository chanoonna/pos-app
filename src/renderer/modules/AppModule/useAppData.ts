/* --------------------------------- imports -------------------------------- */

import { useReducer, Dispatch } from 'react';
import { reducer } from './reducer';
import once from 'lodash/once';

/* ---------------------------------- types --------------------------------- */

import { Module } from 'modules/types';
import { LanguageCode } from 'SettingsModule/types';
import { AppDataActionType, AppDataState, AppDataAction } from './types';
import { LANGUAGE } from '../SettingsModule/constants';

const initialState: AppDataState = {
  auth: { isAuthenticating: false, isAuthenticated: true },
  user: undefined,
  language: LANGUAGE.KOREAN.languageCode,
  currentModule: Module.Startup
};

export const useAppData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    actions: getActions(dispatch)
  };
};

const getActions = once((dispatch: Dispatch<AppDataAction>) => ({
  navigateTo: (module: Module) => {
    dispatch({ type: AppDataActionType.NavigateTo, payload: { module } });
  },
  authenticate: () => {
    dispatch({
      type: AppDataActionType.SetAuthenticated,
      payload: { isAuthenticated: true }
    });
  },
  setLanguage: (language: LanguageCode) => {
    dispatch({ type: AppDataActionType.SetLanguage, payload: { language } });
  },
  logOut: () => {
    dispatch({
      type: AppDataActionType.LogOut,
      payload: { isAuthenticated: false, user: undefined }
    });
  }
}));

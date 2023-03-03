/* --------------------------------- imports -------------------------------- */

import { useCallback, useReducer, Dispatch } from 'react';
import { reducer } from './reducer';
import once from 'lodash/once';

/* ---------------------------------- types --------------------------------- */

import { Module } from 'modules/types';
import { Language } from 'SettingsModule/types';
import { AppDataActionType, AppDataState, AppDataAction } from './types';

const initialState: AppDataState = {
  auth: { isAuthenticating: false, isAuthenticated: true },
  user: undefined,
  language: Language.Kor,
  currentModule: Module.Landing
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
  setLanguage: (language: Language) => {
    dispatch({ type: AppDataActionType.SetLanguage, payload: { language } });
  },
  logOut: () => {
    dispatch({
      type: AppDataActionType.LogOut,
      payload: { isAuthenticated: false, user: undefined }
    });
  }
}));

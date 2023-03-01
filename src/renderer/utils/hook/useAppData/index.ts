/* --------------------------------- imports -------------------------------- */

import { useReducer } from 'react';
import { AppDataActionType, AppDataState } from './types';
import { reducer } from './reducer';

/* ---------------------------------- types --------------------------------- */

import { Module } from 'modules/types';
import { Language } from 'SettingsModule/types';

const initialState: AppDataState = {
  auth: { isAuthenticating: false, isAuthenticated: true },
  user: undefined,
  language: Language.Kor,
  currentModule: Module.Auth
};

export const useAppData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    navigateTo: (module: Module) =>
      dispatch({ type: AppDataActionType.NavigateTo, payload: { module } }),
    authenticate: () =>
      dispatch({
        type: AppDataActionType.SetAuthenticated,
        payload: { isAuthenticated: true }
      })
  };
};

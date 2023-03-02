/* --------------------------------- imports -------------------------------- */

import { useCallback, useReducer } from 'react';
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

  const navigateTo = useCallback((module: Module) => {
    dispatch({ type: AppDataActionType.NavigateTo, payload: { module } });
  }, []);
  const setLanguage = useCallback((language: Language) => {
    dispatch({ type: AppDataActionType.SetLanguage, payload: { language } });
  }, []);
  const authenticate = useCallback(() => {
    dispatch({
      type: AppDataActionType.SetAuthenticated,
      payload: { isAuthenticated: true }
    });
  }, []);

  return {
    state,
    navigateTo,
    authenticate,
    setLanguage
  };
};

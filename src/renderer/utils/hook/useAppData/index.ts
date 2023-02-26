import { useReducer } from 'react';
import { AppDataActionType, AppDataState } from './types';
import { reducer } from './reducer';
import { Module } from 'modules/types';

const initialState: AppDataState = {
  auth: { isAuthenticating: false, isAuthenticated: false },
  user: undefined,
  currentModule: Module.Auth
};

export const useAppData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    navigateTo: (module: Module) =>
      dispatch({ type: AppDataActionType.NavigateTo, payload: { module } })
  };
};

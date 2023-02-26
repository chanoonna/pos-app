import type {
  AppDataState,
  AppDataAction,
  SetAuthenticatingAction,
  SetAuthenticatedAction,
  NavigateToAction
} from './types';
import { AppDataActionType } from './types';

export const reducer = (state: AppDataState, action: AppDataAction) => {
  switch (action.type) {
    case AppDataActionType.SetAuthenticating: {
      return setAuthenticating(state, action);
    }
    case AppDataActionType.SetAuthenticated: {
      return setAuthenticated(state, action);
    }
    case AppDataActionType.NavigateTo: {
      return navigateTo(state, action);
    }
    default:
      return state;
  }
};

const setAuthenticating = (
  state: AppDataState,
  action: SetAuthenticatingAction
) => ({
  ...state,
  auth: {
    ...state.auth,
    isAuthenticating: action.payload.isAuthenticating
  }
});

const setAuthenticated = (
  state: AppDataState,
  action: SetAuthenticatedAction
) => ({
  ...state,
  auth: {
    ...state.auth,
    isAuthenticated: action.payload.isAuthenticated
  }
});

const navigateTo = (state: AppDataState, action: NavigateToAction) => ({
  ...state,
  currentModule: action.payload.module
});

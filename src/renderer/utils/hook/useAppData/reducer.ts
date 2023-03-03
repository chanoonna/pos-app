import type {
  AppDataState,
  AppDataAction,
  SetAuthenticatingAction,
  SetAuthenticatedAction,
  NavigateToAction,
  SetLanguageAction,
  LogOutAction
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
    case AppDataActionType.SetLanguage: {
      return setLanguage(state, action);
    }
    case AppDataActionType.LogOut: {
      return logOut(state, action);
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

const setLanguage = (state: AppDataState, action: SetLanguageAction) => ({
  ...state,
  language: action.payload.language
});

const logOut = (state: AppDataState, action: LogOutAction) => ({
  ...state,
  auth: {
    ...state.auth,
    isAuthenticated: action.payload.isAuthenticated
  },
  user: action.payload.user
});

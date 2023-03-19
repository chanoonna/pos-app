/* ---------------------------------- types --------------------------------- */
import type { AppContextDataState } from './types';
import type { AppPage } from 'modules/types';

/* -------------------------------- constants ------------------------------- */
import { APP_PAGE } from 'modules/constants';
import { CONNECT, CREATE_ADMIN, NAVIGATE_TO, LOGOUT, LOGIN } from './constants';

/* ------------------------------------ - ----------------------------------- */
import { useReducer, useCallback } from 'react';
import { appContextDataReducer } from './appContextDataReducer';
import { connectToMain, createUser, login } from 'api';
import { CreateUserParams, LoginParams } from 'preload/api/users/types';

const initialData: AppContextDataState = {
  user: undefined,
  isLoggingIn: false,
  isLoggingInError: false,
  isAuthenticated: false,
  isConnected: false,
  isConnecting: false,
  isConnectedError: false,
  isCreatingAdmin: false,
  isCreatingAdminError: false,
  currentPage: APP_PAGE.APP_START
};

export const useAppContextData = () => {
  const [state, dispatch] = useReducer(appContextDataReducer, initialData);

  const navigateTo = useCallback((nextPage: AppPage) => {
    dispatch({ type: NAVIGATE_TO, payload: { nextPage } });
  }, []);

  const logIn = useCallback(async (params: LoginParams) => {
    try {
      dispatch({ type: LOGIN.REQUEST });
      const { response, error } = await login(params);

      if (error) {
        dispatch({
          type: LOGIN.FAILURE,
          payload: { error }
        });
      } else {
        dispatch({
          type: LOGIN.SUCCESS,
          payload: { response }
        });
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigateTo(APP_PAGE.LOGIN);
  }, [navigateTo]);

  const connect = useCallback(async () => {
    try {
      dispatch({ type: CONNECT.REQUEST });

      const { response, error } = await connectToMain();

      if (error) {
        dispatch({
          type: CONNECT.FAILURE,
          payload: { error }
        });
      } else {
        dispatch({
          type: CONNECT.SUCCESS,
          payload: { response }
        });

        if (response) {
          navigateTo(APP_PAGE.LOGIN);
        }
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
  }, [navigateTo]);

  const createAdmin = useCallback(
    async (params: CreateUserParams) => {
      try {
        dispatch({ type: CREATE_ADMIN.REQUEST, payload: { params } });
        const { error } = await createUser(params);

        if (error) {
          dispatch({
            type: CREATE_ADMIN.FAILURE,
            payload: { error }
          });
        } else {
          dispatch({
            type: CREATE_ADMIN.SUCCESS
          });
          logIn({
            username: params.username,
            password: params.password
          });
        }
      } catch (error) {
        // TODO
        console.log(error);
      }
    },
    [logIn]
  );

  return { state, connect, navigateTo, logOut, logIn, createAdmin };
};

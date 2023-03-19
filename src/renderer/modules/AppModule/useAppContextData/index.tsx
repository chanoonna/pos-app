/* ---------------------------------- types --------------------------------- */
import type { AppContextDataState } from './types';
import type { AppPage } from 'modules/types';

/* -------------------------------- constants ------------------------------- */
import { APP_PAGE } from 'modules/constants';
import { CONNECT, CREATE_ADMIN, NAVIGATE_TO, LOGOUT } from './constants';

/* ------------------------------------ - ----------------------------------- */
import { useReducer, useCallback } from 'react';
import { appContextDataReducer } from './appContextDataReducer';
import { connectToMain, createUser } from 'api';
import { CreateUserParams } from 'preload/api/users/types';

const initialData: AppContextDataState = {
  user: undefined,
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

  const logOut = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigateTo(APP_PAGE.APP_START);
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
  }, []);

  const createAdmin = useCallback(
    async (params: CreateUserParams) => {
      try {
        dispatch({ type: CREATE_ADMIN.REQUEST, payload: { params } });
        const { response, error } = await createUser(params);

        if (error) {
          dispatch({
            type: CREATE_ADMIN.FAILURE,
            payload: { error }
          });
        } else {
          dispatch({
            type: CREATE_ADMIN.SUCCESS,
            payload: { response }
          });
          navigateTo(APP_PAGE.LOGIN);
        }
      } catch (error) {
        // TODO
        console.log(error);
      }
    },
    [navigateTo]
  );

  return { state, connect, navigateTo, logOut, createAdmin };
};

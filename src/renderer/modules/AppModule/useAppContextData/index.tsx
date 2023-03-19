/* ---------------------------------- types --------------------------------- */
import type { AppContextDataState } from './types';
import type { User } from 'models/user';
import type { AppPage } from 'modules/types';

/* -------------------------------- constants ------------------------------- */
import { APP_PAGE } from 'modules/constants';
import { CONNECT, NAVIGATE_TO, LOGOUT } from './constants';

/* ------------------------------------ - ----------------------------------- */
import { useReducer, useCallback } from 'react';
import { appContextDataReducer } from './appContextDataReducer';
import { connectToMain } from 'api';

const initialData: AppContextDataState = {
  user: undefined,
  isAuthenticated: false,
  isConnected: false,
  isConnecting: false,
  isConnectedError: false,
  currentPage: APP_PAGE.APP_START
};

export const useAppContextData = () => {
  const [state, dispatch] = useReducer(appContextDataReducer, initialData);

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
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
  }, []);

  const navigateTo = useCallback((nextPage: AppPage) => {
    dispatch({ type: NAVIGATE_TO, payload: { nextPage } });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigateTo(APP_PAGE.APP_START);
  }, [navigateTo]);

  return { state, connect, navigateTo, logOut };
};

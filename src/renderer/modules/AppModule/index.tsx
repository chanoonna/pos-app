/* ---------------------------------- style --------------------------------- */
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* ---------------------------------- types --------------------------------- */
import type { AppPage } from 'modules/types';
import type { User } from 'models/user';

/* --------------------------------- imports -------------------------------- */
import { useEffect, createContext, useContext } from 'react';
import { NavBar } from 'NavModule/NavBar';
import { useAppContextData } from './useAppContextData';
import { appPageHash } from '../appPageHash';
import { AppContainer } from 'components/container/AppContainer';
import { AppStarting } from './AppStarting';

/* ------------------------------------ - ----------------------------------- */

type AppContextValues = {
  user: User;
  currentPage: AppPage;
  navigateTo: (nextPage: AppPage) => void;
  logOut: () => void;
};

export const App = () => {
  const { state, connect, navigateTo, logOut } = useAppContextData();
  const { user, currentPage } = state;

  useEffect(() => {
    const timeout = setTimeout(connect, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [connect]);

  const MainComponent = appPageHash[currentPage];

  return user ? (
    <AppContext.Provider
      value={{
        user,
        currentPage,
        navigateTo,
        logOut
      }}
    >
      <AppContainer>
        <NavBar />
        <MainComponent />
      </AppContainer>
    </AppContext.Provider>
  ) : (
    <AppStarting isConnected={state.isConnected} navigateTo={navigateTo} />
  );
};

const AppContext = createContext<AppContextValues>({} as AppContextValues);

export const useAppContext = () => useContext(AppContext);

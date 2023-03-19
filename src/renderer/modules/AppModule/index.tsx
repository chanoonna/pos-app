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
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NavBar } from 'NavModule/NavBar';
import { useAppContextData } from './useAppContextData';
import { appPageHash } from '../appPageHash';
import { AppContainer } from 'components/container/AppContainer';
import { AppStarting } from './AppStarting';
import { theme } from 'style/theme';
import { APP_PAGE } from '../constants';

/* ------------------------------------ - ----------------------------------- */

type AppContextValues = {
  user: User;
  currentPage: AppPage;
  navigateTo: (nextPage: AppPage) => void;
  logOut: () => void;
};

export const App = () => {
  const { state, connect, navigateTo, createAdmin, logOut } =
    useAppContextData();
  const { user, currentPage } = state;

  useEffect(() => {
    const timeout = setTimeout(connect, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [connect]);

  const MainComponent = appPageHash[currentPage];

  return user && currentPage !== APP_PAGE.APP_START ? (
    <ThemeProvider theme={theme[user.color_theme]}>
      <CssBaseline />
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
    </ThemeProvider>
  ) : (
    <AppStarting isConnected={state.isConnected} createAdmin={createAdmin} />
  );
};

const AppContext = createContext<AppContextValues>({} as AppContextValues);

export const useAppContext = () => useContext(AppContext);

/* ---------------------------------- style --------------------------------- */
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* ---------------------------------- types --------------------------------- */
import type { AppPage } from 'modules/types';
import type { User } from 'models';
import type { AppContextDataState } from './useAppContextData/types';
import type { LoginParams, UpdateSettingsParams } from 'api/types';

/* --------------------------------- imports -------------------------------- */
import { useEffect, createContext, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NavBar } from 'NavModule/NavBar';
import { useAppContextData } from './useAppContextData';
import { appPageHash } from '../appPageHash';
import { AppContainer } from 'components/container/AppContainer';
import { AppStarting } from './AppStarting';
import { SettingsModal } from 'SettingsModule/SettingsModal';
import { theme } from 'style/theme';
import { APP_PAGE } from '../constants';

/* ------------------------------------ - ----------------------------------- */

export const App = () => {
  const {
    state,
    connect,
    navigateTo,
    createAdmin,
    logOut,
    logIn,
    getSettings,
    updateSettings,
    getStoreInfo,
    updateStoreInfo,
    setSettingsModalOpen
  } = useAppContextData();
  const { user, currentPage, settingsState } = state;

  useEffect(() => {
    connect();
    getSettings();
    getStoreInfo();
  }, [connect, getSettings, getStoreInfo]);

  const MainComponent = appPageHash[currentPage];

  return user && currentPage !== APP_PAGE.APP_START ? (
    <ThemeProvider theme={theme[settingsState.colorTheme]}>
      <CssBaseline />
      <AppContext.Provider
        value={{
          user,
          settingsState,
          isLoggingIn: state.isLoggingIn,
          isLoggingInError: state.isLoggingInError,
          currentPage,
          navigateTo,
          logOut,
          logIn,
          updateSettings,
          setSettingsModalOpen
        }}
      >
        <AppContainer>
          <NavBar />
          <MainComponent />
        </AppContainer>
        <SettingsModal />
      </AppContext.Provider>
    </ThemeProvider>
  ) : (
    <AppStarting
      user={user}
      language={settingsState.language}
      uiSize={settingsState.uiSize}
      colorTheme={settingsState.colorTheme}
      isAuthenticated={state.isAuthenticated}
      isConnected={state.isConnected}
      createAdmin={createAdmin}
      navigateTo={navigateTo}
      updateSettings={updateSettings}
    />
  );
};

interface AppContextValues {
  user: User;
  settingsState: AppContextDataState['settingsState'];
  isLoggingIn: boolean;
  isLoggingInError: boolean;
  currentPage: AppPage;
  navigateTo: (nextPage: AppPage) => void;
  logOut: () => void;
  logIn: (params: LoginParams) => void;
  updateSettings: (params: UpdateSettingsParams) => void;
  setSettingsModalOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextValues>({} as AppContextValues);

export const useAppContext = () => useContext(AppContext);

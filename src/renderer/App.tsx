/* ---------------------------------- Style --------------------------------- */
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* ------------------------------------ - ----------------------------------- */
import { useEffect } from 'react';
import { useAppData } from 'AppModule/useAppData';
import { AppContextProvider } from 'AppModule/AppContextProvider';
import { NavBar } from 'NavModule/NavBar';
import { moduleHash } from 'modules/moduleHash';
import { Module } from 'modules/types';

import { AppContainer } from 'components/container/AppContainer';

export const App = () => {
  const { actions, state } = useAppData();
  const {
    currentModule,
    auth: { isAuthenticated }
  } = state;
  const ModuleComponent = moduleHash[currentModule];

  const appContextProps = {
    state,
    ...actions
  };

  useEffect(() => {
    if (!isAuthenticated) {
      actions.navigateTo(Module.Auth);
    }
  }, [actions, isAuthenticated]);

  return (
    <AppContextProvider {...appContextProps}>
      <AppContainer>
        <NavBar />
        <ModuleComponent />
      </AppContainer>
    </AppContextProvider>
  );
};

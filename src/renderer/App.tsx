/* ---------------------------------- Style --------------------------------- */
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* ------------------------------------ - ----------------------------------- */
import { useAppData } from 'utils/hook/useAppData';
import { AddContextProvider } from 'modules/App/AppContextProvider';
import { AppNavBar } from 'renderer/modules/App/AppNavBar';
import { moduleHash } from 'modules/moduleHash';
import { Module } from 'modules/types';

import { AppContainer } from 'components/container/AppContainer';

export const App = () => {
  const { navigateTo, authenticate, setLanguage, state } = useAppData();
  const {
    currentModule,
    auth: { isAuthenticated }
  } = state;
  const ModuleComponent = moduleHash[currentModule];

  const appContextProps = {
    state,
    navigateTo,
    authenticate,
    setLanguage
  };

  return (
    <AddContextProvider {...appContextProps}>
      <AppContainer>
        {currentModule !== Module.Auth && <AppNavBar />}
        <ModuleComponent />
      </AppContainer>
    </AddContextProvider>
  );
};

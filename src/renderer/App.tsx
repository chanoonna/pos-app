/* ---------------------------------- Style --------------------------------- */
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* ------------------------------------ - ----------------------------------- */
import { useAppData } from 'utils/hook/useAppData';
import { AddContextProvider } from 'modules/App/AppContextProvider';
import { AppMenuBar } from 'modules/AppMenuBarModule/AppMenuBar';
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

  return (
    <AddContextProvider {...appContextProps}>
      <AppContainer>
        {currentModule !== Module.Auth && <AppMenuBar />}
        <ModuleComponent />
      </AppContainer>
    </AddContextProvider>
  );
};

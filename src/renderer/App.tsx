/* ---------------------------------- Style --------------------------------- */
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* ------------------------------------ - ----------------------------------- */
import styled from 'styled-components';
import { colors } from 'style/theme';
import { useAppData } from 'utils/hook/useAppData';
import { AddContextProvider } from 'modules/App/AppContextProvider';
import { moduleHash } from 'modules/moduleHash';

/* -------------------------------- Component ------------------------------- */

export const App = () => {
  const { navigateTo, state } = useAppData();
  const { currentModule } = state;
  const ModuleComponent = moduleHash[currentModule];

  const appContextProps = {
    currentModule,
    navigateTo
  };

  return (
    <AddContextProvider {...appContextProps}>
      <AppContainer>
        <ModuleComponent />
      </AppContainer>
    </AddContextProvider>
  );
};

const AppContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${colors.backgroupBlack};
`;

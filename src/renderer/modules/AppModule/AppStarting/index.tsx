/* ---------------------------------- types --------------------------------- */
import type { AppPage } from 'modules/types';
import type { LanguageCode } from 'SettingsModule/types';
import type { AppStartingState } from './types';
import type { ColorTheme, UiSize } from 'style/types';

/* -------------------------------- constants ------------------------------- */
import { LANGUAGE } from 'SettingsModule/constants';
import {
  SELECT_LANGUAGE,
  SYSTEM_SETTINGS,
  CREATE_ADMIN,
  IMPORTANT_NOTICE,
  labels
} from './constants';
import { COLOR_THEME, UI_SIZE } from 'style/constants';

/* --------------------------------- imports -------------------------------- */
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { PageContainer } from 'components/container';
import { SetupStepper } from './SetupStepper';
import { LanguageSelect } from './LanguageSelect';
import { StepButtonGroup } from './StepButtonGroup';
import { SystemSettings } from './SystemSettings';
import { theme } from 'style/theme';

/* ------------------------------------ - ----------------------------------- */

const initialState: AppStartingState = {
  step: 0,
  language: LANGUAGE.ENGLISH.languageCode,
  uiSize: UI_SIZE.LARGE,
  colorTheme: COLOR_THEME.DEFAULT,
  username: 'admin',
  password: '1234'
};

const STEPS = [
  SELECT_LANGUAGE,
  SYSTEM_SETTINGS,
  CREATE_ADMIN,
  IMPORTANT_NOTICE
];

export const AppStarting = ({
  isConnected,
  navigateTo
}: {
  isConnected: boolean;
  navigateTo: (nextPage: AppPage) => void;
}) => {
  const [state, setState] = useState(initialState);

  const setLanguage = (language: LanguageCode) => {
    setState((curr) => ({ ...curr, language }));
  };
  const setUiSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uiSize = event.target.value as UiSize;
    setState((curr) => ({ ...curr, uiSize }));
  };
  const setColorTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const colorTheme = event.target.value as ColorTheme;
    setState((curr) => ({ ...curr, colorTheme }));
  };
  const onClickNext = () => {
    setState((curr) => ({
      ...curr,
      step: Math.min(state.step + 1, STEPS.length - 1)
    }));
  };
  const onClickBack = () => {
    setState((curr) => ({ ...curr, step: Math.max(state.step - 1, 0) }));
  };

  const appStartingLabel = labels[state.language];

  return (
    <ThemeProvider theme={theme[state.colorTheme]}>
      <CssBaseline />
      <PageContainer
        padding="2rem 0"
        alignItems="center"
        justifyContent={isConnected ? 'space-between' : 'center'}
        flexDirection="column"
      >
        {isConnected ? (
          <>
            <SetupStepper
              steps={STEPS}
              uiSize={state.uiSize}
              activeStep={state.step}
              language={state.language}
            />
            {state.step === 0 && (
              <LanguageSelect
                uiSize={state.uiSize}
                labels={appStartingLabel}
                language={state.language}
                setLanguage={setLanguage}
              />
            )}
            {state.step === 1 && (
              <SystemSettings
                labels={appStartingLabel}
                uiSize={state.uiSize}
                colorTheme={state.colorTheme}
                setUiSize={setUiSize}
                setColorTheme={setColorTheme}
              />
            )}
            <StepButtonGroup
              activeStep={state.step}
              steps={STEPS}
              labels={appStartingLabel}
              uiSize={state.uiSize}
              onClickNext={onClickNext}
              onClickBack={onClickBack}
            />
          </>
        ) : (
          <CircularProgress size={40} thickness={5} />
        )}
      </PageContainer>
      <CssBaseline />
    </ThemeProvider>
  );
};

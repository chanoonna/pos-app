/* ---------------------------------- types --------------------------------- */
import type { LanguageCode } from 'SettingsModule/types';
import type { AppStartingState } from './types';
import type { ColorTheme, UiSize } from 'style/types';
import type { CreateUserParams } from 'preload/api/users/types';
import type { User } from 'models/user';
import type { AppPage } from 'renderer/modules/types';

/* -------------------------------- constants ------------------------------- */
import { LANGUAGE } from 'SettingsModule/constants';
import {
  SELECT_LANGUAGE,
  SYSTEM_SETTINGS,
  CREATE_ADMIN,
  BEFORE_STARTING,
  labels
} from './constants';
import { APP_PAGE } from 'modules/constants';

/* --------------------------------- imports -------------------------------- */
import { useState, useEffect } from 'react';
import { theme } from 'style/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { PageContainer } from 'components/container';
import { SetupStepper } from './SetupStepper';
import { LanguageSelect } from './LanguageSelect';
import { StepButtonGroup } from './StepButtonGroup';
import { SystemSettings } from './SystemSettings';
import { CreateAdmin } from './CreateAdmin';
import { BeforeStarting } from './BeforeStarting';

/* ------------------------------------ - ----------------------------------- */

const initialState: AppStartingState = {
  step: 0,
  language: LANGUAGE.ENGLISH.languageCode,
  uiSize: 'large',
  colorTheme: 'bright',
  username: 'admin',
  password: '',
  confirmPassword: ''
};

const STEPS = [SELECT_LANGUAGE, SYSTEM_SETTINGS, CREATE_ADMIN, BEFORE_STARTING];

export const AppStarting = ({
  user,
  isConnected,
  isAuthenticated,
  createAdmin,
  navigateTo
}: {
  user?: User;
  isConnected: boolean;
  isAuthenticated: boolean;
  createAdmin: (params: CreateUserParams) => void;
  navigateTo: (page: AppPage) => void;
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
  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((curr) => ({ ...curr, username: event.target.value }));
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((curr) => ({ ...curr, password: event.target.value }));
  };
  const onConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState((curr) => ({ ...curr, confirmPassword: event.target.value }));
  };
  const onCreateAdmin = () => {
    createAdmin({
      username: state.username,
      password: state.password,
      ui_size: state.uiSize,
      color_theme: state.colorTheme,
      language: state.language,
      access_level: 1
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo(APP_PAGE.MENU);
    }
  }, [isAuthenticated, navigateTo]);
  useEffect(() => {
    if (user && !isAuthenticated) {
      navigateTo(APP_PAGE.LOGIN);
    }
  }, [isAuthenticated, navigateTo, user]);

  const appStartingLabel = labels[state.language];
  const isPasswordValid =
    !!state.password.length && state.password === state.confirmPassword;

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
              labels={appStartingLabel}
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
            {state.step === 2 && (
              <CreateAdmin
                uiSize={state.uiSize}
                labels={appStartingLabel}
                username={state.username}
                password={state.password}
                confirmPassword={state.confirmPassword}
                isPasswordEmpty={
                  !state.password.length && !state.confirmPassword.length
                }
                isPasswordValid={isPasswordValid}
                onUsernameChange={onUsernameChange}
                onPasswordChange={onPasswordChange}
                onConfirmPasswordChange={onConfirmPasswordChange}
              />
            )}
            {state.step === 3 && (
              <BeforeStarting labels={appStartingLabel} uiSize={state.uiSize} />
            )}
            <StepButtonGroup
              activeStep={state.step}
              steps={STEPS}
              labels={appStartingLabel}
              uiSize={state.uiSize}
              disabledTooltip={appStartingLabel.noPasswordMatchTooltip}
              disableNext={state.step === 2 && !isPasswordValid}
              onClickNext={onClickNext}
              onClickBack={onClickBack}
              onCreateAdmin={onCreateAdmin}
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

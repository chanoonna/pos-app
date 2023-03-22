/* ---------------------------------- types --------------------------------- */
import type { LanguageCode } from 'SettingsModule/types';
import type { AppStartingState } from './types';
import type { ColorTheme, UiSize } from 'style/types';
import type { CreateUserParams } from 'preload/api/users/types';
import type { Settings, User } from 'renderer/models';
import type { AppPage } from 'renderer/modules/types';

/* -------------------------------- constants ------------------------------- */
import {
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
import Box from '@mui/material/Box';
import { PageContainer } from 'components/container';
import { SetupStepper } from './SetupStepper';
import { StepButtonGroup } from './StepButtonGroup';
import { CreateAdmin } from './CreateAdmin';
import { BeforeStarting } from './BeforeStarting';
import { SettingsPage } from 'SettingsModule/SettingsPage';
import { style } from 'SettingsModule/SettingsModal';

/* ------------------------------------ - ----------------------------------- */

const initialState: AppStartingState = {
  step: 0,
  username: 'admin',
  password: '',
  confirmPassword: ''
};

const STEPS = [SYSTEM_SETTINGS, CREATE_ADMIN, BEFORE_STARTING];

export const AppStarting = ({
  user,
  language,
  uiSize,
  colorTheme,
  isConnected,
  isAuthenticated,
  createAdmin,
  navigateTo,
  updateSettings
}: {
  user?: User;
  language: LanguageCode;
  uiSize: UiSize;
  colorTheme: ColorTheme;
  isConnected: boolean;
  isAuthenticated: boolean;
  createAdmin: (
    params: Pick<User, 'username' | 'accessLevel'> & { password: string }
  ) => void;
  navigateTo: (page: AppPage) => void;
  updateSettings: (params: Settings) => void;
}) => {
  const [state, setState] = useState(initialState);

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
      accessLevel: 1
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

  const appStartingLabel = labels[language];
  const isPasswordValid =
    !!state.password.length && state.password === state.confirmPassword;

  return (
    <ThemeProvider theme={theme[colorTheme]}>
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
              uiSize={uiSize}
              activeStep={state.step}
              labels={appStartingLabel}
            />
            {state.step === 0 && (
              <Box sx={style}>
                <SettingsPage
                  language={language}
                  uiSize={uiSize}
                  colorTheme={colorTheme}
                  showCloseButton={false}
                  updateSettings={updateSettings}
                />
              </Box>
            )}
            {state.step === 1 && (
              <CreateAdmin
                uiSize={uiSize}
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
            {state.step === 2 && (
              <BeforeStarting labels={appStartingLabel} uiSize={uiSize} />
            )}
            <StepButtonGroup
              activeStep={state.step}
              steps={STEPS}
              labels={appStartingLabel}
              uiSize={uiSize}
              disabledTooltip={appStartingLabel.noPasswordMatchTooltip}
              disableNext={state.step === 1 && !isPasswordValid}
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

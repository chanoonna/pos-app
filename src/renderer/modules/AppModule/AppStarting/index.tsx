/* ---------------------------------- types --------------------------------- */
import type { AppPage } from 'modules/types';
import type { LanguageCode } from 'SettingsModule/types';
import type { AppStartingState } from './types';

/* -------------------------------- constants ------------------------------- */
import { LANGUAGE } from 'SettingsModule/constants';
import { SELECT_LANGUAGE, CREATE_ADMIN, IMPORTANT_NOTICE } from './constants';

/* --------------------------------- imports -------------------------------- */
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PageContainer } from 'components/container';
import { colors } from 'style/theme';
import { SetupStepper } from './SetupStepper';
import { LanguageSelect } from './LanguageSelect';
import { StepButtonGroup } from './StepButtonGroup';

/* ------------------------------------ - ----------------------------------- */

const initialState: AppStartingState = {
  step: 0,
  language: LANGUAGE.ENGLISH.languageCode,
  username: 'admin',
  password: '1234'
};

const componentByStep: Record<number, (props: any) => JSX.Element> = {
  0: LanguageSelect,
  1: LanguageSelect,
  2: LanguageSelect
} as const;

const STEPS = [SELECT_LANGUAGE, CREATE_ADMIN, IMPORTANT_NOTICE];

export const AppStarting = ({
  isConnected,
  navigateTo
}: {
  isConnected: boolean;
  navigateTo: (nextPage: AppPage) => void;
}) => {
  const [state, setState] = useState(initialState);
  const Component = componentByStep[state.step];

  const setLanguage = (language: LanguageCode) => {
    setState((curr) => ({ ...curr, language }));
  };
  const onClickNext = () => {
    setState((curr) => ({ ...curr, step: Math.min(state.step + 1, 2) }));
  };
  const onClickBack = () => {
    setState((curr) => ({ ...curr, step: Math.max(state.step - 1, 0) }));
  };

  return (
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
            activeStep={state.step}
            language={state.language}
          />
          {Component && (
            <Component language={state.language} setLanguage={setLanguage} />
          )}
          <StepButtonGroup
            language={state.language}
            activeStep={state.step}
            steps={STEPS}
            onClickNext={onClickNext}
            onClickBack={onClickBack}
          />
        </>
      ) : (
        <CircularProgress
          size={38}
          thickness={5}
          sx={{ color: colors.mediumBlue1 }}
        />
      )}
    </PageContainer>
  );
};

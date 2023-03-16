/* ---------------------------------- types --------------------------------- */
import type { LanguageCode } from 'SettingsModule/types';
import type { Step } from './types';

/* -------------------------------- constants ------------------------------- */
import { labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import { FlexContainer } from 'components/container';

import Button from '@mui/material/Button';

/* ------------------------------------ - ----------------------------------- */

export const StepButtonGroup = ({
  language,
  activeStep,
  onClickNext,
  onClickBack,
  steps
}: {
  steps: Step[];
  language: LanguageCode;
  activeStep: number;
  onClickNext: () => void;
  onClickBack: () => void;
}) => {
  const stepButtonLabels = labels[language];
  return (
    <FlexContainer justifyContent="space-between">
      <Button
        color="inherit"
        size="large"
        disabled={activeStep === 0}
        onClick={onClickBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Button size="large" onClick={onClickNext}>
        {activeStep === steps.length - 1 ? 'Start' : 'Next'}
      </Button>
    </FlexContainer>
  );
};

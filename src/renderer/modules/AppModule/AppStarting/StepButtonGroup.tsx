/* ---------------------------------- types --------------------------------- */
import type { LanguageCode } from 'SettingsModule/types';
import type { Step } from './types';

/* -------------------------------- constants ------------------------------- */
import { labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import Button from '@mui/material/Button';

import { FlexContainer } from 'components/container';

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
    <FlexContainer
      height="fit-content"
      width="75%"
      justifyContent="space-between"
    >
      <Button
        // color="inherit"
        size="large"
        disabled={activeStep === 0}
        onClick={onClickBack}
      >
        Back
      </Button>
      <Button size="large" onClick={onClickNext}>
        {activeStep === steps.length - 1 ? 'Start' : 'Next'}
      </Button>
    </FlexContainer>
  );
};

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
      width="80%"
      justifyContent="space-between"
    >
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={onClickBack}
        sx={{
          px: '1rem',
          width: 'fit-content',
          height: 'fit-content',
          fontSize: '1.5rem'
        }}
      >
        Back
      </Button>
      <Button
        sx={{
          px: '1rem',
          width: 'fit-content',
          height: 'fit-content',
          fontSize: '1.5rem'
        }}
        onClick={onClickNext}
      >
        {activeStep === steps.length - 1 ? 'Start' : 'Next'}
      </Button>
    </FlexContainer>
  );
};

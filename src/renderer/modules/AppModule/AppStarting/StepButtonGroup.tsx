/* ---------------------------------- types --------------------------------- */
import type { Step } from './types';
import type { UiSize } from 'style/types';

/* -------------------------------- constants ------------------------------- */
import { Labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import Button from '@mui/material/Button';
import { FlexContainer } from 'components/container';

/* ------------------------------------ - ----------------------------------- */

export const StepButtonGroup = ({
  steps,
  uiSize,
  labels,
  activeStep,
  onClickNext,
  onClickBack
}: {
  steps: Step[];
  uiSize: UiSize;
  labels: Labels;
  activeStep: number;
  onClickNext: () => void;
  onClickBack: () => void;
}) => {
  return (
    <FlexContainer
      height="3rem"
      width="90%"
      justifyContent="space-between"
      alignItems="center"
    >
      <FlexContainer alignItems="center" margin={0} height="3rem" width="5rem">
        <Button
          color="inherit"
          size={uiSize}
          disabled={activeStep === 0}
          onClick={onClickBack}
        >
          {labels.back}
        </Button>
      </FlexContainer>
      <FlexContainer alignItems="center" margin={0} height="3rem" width="5rem">
        <Button size={uiSize} onClick={onClickNext}>
          {activeStep === steps.length - 1 ? labels.start : labels.next}
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
};

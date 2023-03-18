/* ---------------------------------- types --------------------------------- */
import type { Step } from './types';
import type { UiSize } from 'style/types';

/* -------------------------------- constants ------------------------------- */
import { Labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import { FlexContainer } from 'components/container';
import { NoMaxWidthTooltip } from 'components/tooltip';
import { SizeAppliedText } from 'components/typography';

/* ------------------------------------ - ----------------------------------- */

export const StepButtonGroup = ({
  steps,
  uiSize,
  labels,
  activeStep,
  onClickNext,
  onClickBack,
  disableNext = false
}: {
  steps: Step[];
  uiSize: UiSize;
  labels: Labels;
  activeStep: number;
  onClickNext: () => void;
  onClickBack: () => void;
  disableNext?: boolean;
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
        <NoMaxWidthTooltip
          title={
            disableNext ? (
              <SizeAppliedText textTypeVariant="tooltip" uiSize={uiSize}>
                {labels.disabledNextTooltip}
              </SizeAppliedText>
            ) : undefined
          }
          placement="top"
          TransitionComponent={Zoom}
          sx={{
            size: '1rem'
          }}
        >
          <span>
            <Button size={uiSize} onClick={onClickNext} disabled={disableNext}>
              {activeStep === steps.length - 1 ? labels.start : labels.next}
            </Button>
          </span>
        </NoMaxWidthTooltip>
      </FlexContainer>
    </FlexContainer>
  );
};

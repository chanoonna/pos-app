/* ---------------------------------- types --------------------------------- */
import type { LanguageCode } from 'SettingsModule/types';
import type { Step as StepType } from './types';

/* -------------------------------- constants ------------------------------- */
import { labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, {
  stepConnectorClasses
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

export const SetupStepper = ({
  steps,
  activeStep,
  language
}: {
  steps: StepType[];
  activeStep: number;
  language: LanguageCode;
}) => {
  const stepperLabels = labels[language];

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              {stepperLabels[label]}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

const QontoStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
};

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4'
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor'
    }
  })
);

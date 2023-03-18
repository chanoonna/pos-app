/* ---------------------------------- types --------------------------------- */
import type { UiSize } from 'style/types';
import type { Labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { SizeAppliedText } from 'components/typography';
import { FlexContainer } from 'components/container';

/* ------------------------------------ - ----------------------------------- */

export const BeforeStarting = ({
  labels,
  uiSize
}: {
  labels: Labels;
  uiSize: UiSize;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FlexContainer marginTop="-5rem" rowGap={3} flexDirection="column">
      <SizeAppliedText textTypeVariant="heading" uiSize={uiSize}>
        {labels.beforeStarting}
      </SizeAppliedText>
      <FlexContainer
        height="fit-content"
        alignItems="flex-start"
        justifyContent="flex-start"
        padding="0 !important"
      >
        <FiberManualRecordIcon
          fontSize="small"
          sx={{ mt: marginTop[uiSize], mr: 1 }}
        />
        <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
          <span style={{ color: 'red' }}>{labels.beforeStartingCaution}</span>
          {labels.beforeStartingText1}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {labels.beforeStartingTextClickHere}
          </span>
        </SizeAppliedText>
      </FlexContainer>
      <FlexContainer
        height="fit-content"
        alignItems="flex-start"
        justifyContent="flex-start"
        padding="0 !important"
      >
        <FiberManualRecordIcon
          fontSize="small"
          sx={{ mt: marginTop[uiSize], mr: 1 }}
        />
        <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
          {labels.beforeStartingText2}
        </SizeAppliedText>
      </FlexContainer>
      <FlexContainer
        height="fit-content"
        alignItems="flex-start"
        justifyContent="flex-start"
        padding="0 !important"
      >
        <FiberManualRecordIcon
          fontSize="small"
          sx={{ mt: marginTop[uiSize], mr: 1 }}
        />
        <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
          {labels.beforeStartingText3}
        </SizeAppliedText>
      </FlexContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <SizeAppliedText textTypeVariant="heading" uiSize={uiSize}>
              {labels.licenseHeader}
            </SizeAppliedText>
            <br />
            <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
              {labels.license1}
            </SizeAppliedText>
            <br />
            <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
              {labels.license2}
            </SizeAppliedText>
            <br />
            <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
              {labels.license3}
            </SizeAppliedText>
            <br />
            <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
              {labels.license4}
            </SizeAppliedText>
            <br />
            <SizeAppliedText textTypeVariant="body" uiSize={uiSize}>
              {labels.license5}
            </SizeAppliedText>
          </Box>
        </Fade>
      </Modal>
    </FlexContainer>
  );
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5
};

const marginTop = {
  medium: 0.25,
  large: 0.5,
  extraLarge: 0.7
};

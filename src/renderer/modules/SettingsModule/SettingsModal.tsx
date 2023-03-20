/* ---------------------------------- types --------------------------------- */
import type { Settings } from 'models';
import type { ColorTheme, UiSize } from 'style/types';

/* -------------------------------- constants ------------------------------- */
import { labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { SizeAppliedText } from 'components/typography';
import { FlexContainer } from 'components/container';
import { LanguageCode } from './types';
import { useAppContext } from '../AppModule';

export const SettingsModal = () => {
  const {
    settingsState: {
      isSettingsModalOpen: isOpen,
      language,
      uiSize,
      colorTheme
    },
    setSettingsModalOpen
  } = useAppContext();
  const settingsLabel = labels[language].SettingsModal;
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => {
        setSettingsModalOpen(false);
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
          <FlexContainer>
            <SizeAppliedText
              textAlign="center"
              textTypeVariant="heading"
              uiSize={uiSize}
            >
              {settingsLabel.title}
            </SizeAppliedText>
          </FlexContainer>
        </Box>
      </Fade>
    </Modal>
  );
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
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

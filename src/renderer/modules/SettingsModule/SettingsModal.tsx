/* --------------------------------- imports -------------------------------- */
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

import { useAppContext } from '../AppModule';
import { SettingsPage } from './SettingsPage';

export const SettingsModal = () => {
  const {
    settingsState: {
      isSettingsModalOpen: isOpen,
      language,
      uiSize,
      colorTheme
    },
    updateSettings,
    setSettingsModalOpen
  } = useAppContext();

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
          <SettingsPage
            language={language}
            uiSize={uiSize}
            colorTheme={colorTheme}
            updateSettings={updateSettings}
            closeSettingsModal={() => {
              setSettingsModalOpen(false);
            }}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
  height: '35rem',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5
};

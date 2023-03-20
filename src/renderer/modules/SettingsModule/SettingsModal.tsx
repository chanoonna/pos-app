/* ---------------------------------- types --------------------------------- */
import type { Settings } from 'models';
import type { ColorTheme, UiSize } from 'style/types';

/* -------------------------------- constants ------------------------------- */
import { labels } from './constants';
import { labels as languageSelectorLabels } from 'AppModule/AppStarting/constants';

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
import { LanguageSelect } from './components/LanguageSelector';
import { SizeAndColorOptions } from './components/SizeAndColorOptions';

export const SettingsModal = () => {
  const {
    settingsState: {
      isSettingsModalOpen: isOpen,
      language,
      uiSize,
      colorTheme
    },
    setSettingsModalOpen,
    updateSettings
  } = useAppContext();
  const settingsLabel = labels[language].SettingsModal;

  const setLanguage = (newLanguage: LanguageCode) => {
    updateSettings({
      language: newLanguage,
      uiSize,
      colorTheme
    });
  };

  const setUiSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUiSize = (event.target as HTMLInputElement).value as UiSize;
    updateSettings({
      language,
      uiSize: newUiSize,
      colorTheme
    });
  };

  const setColorTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColorTheme = (event.target as HTMLInputElement)
      .value as ColorTheme;
    updateSettings({
      language,
      uiSize,
      colorTheme: newColorTheme
    });
  };

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
          <FlexContainer alignItems="center" height="5rem">
            <SizeAppliedText
              textAlign="center"
              textTypeVariant="heading"
              uiSize={uiSize}
            >
              {settingsLabel.title}
            </SizeAppliedText>
          </FlexContainer>
          <LanguageSelect
            labels={languageSelectorLabels[language]}
            uiSize={uiSize}
            language={language}
            setLanguage={(newLanguage: LanguageCode) => {
              updateSettings({
                language: newLanguage,
                uiSize,
                colorTheme
              });
            }}
          />
          <SizeAndColorOptions
            labels={languageSelectorLabels[language]}
            uiSize={uiSize}
            colorTheme={colorTheme}
            setUiSize={setUiSize}
            setColorTheme={setColorTheme}
          />
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
  width: '30%',
  height: '60%',
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

/* ---------------------------------- types --------------------------------- */
import type { ColorTheme, UiSize } from 'style/types';

/* -------------------------------- constants ------------------------------- */
import { labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import Button from '@mui/material/Button';

import { SizeAppliedText } from 'components/typography';
import { FlexContainer } from 'components/container';
import { LanguageCode } from './types';
import { LanguageSelect } from './components/LanguageSelector';
import { SizeAndColorOptions } from './components/SizeAndColorOptions';
import { UpdateSettingsParams } from 'api/types';

export const SettingsPage = ({
  language,
  uiSize,
  colorTheme,
  showCloseButton = true,
  updateSettings,
  closeSettingsModal
}: {
  language: LanguageCode;
  uiSize: UiSize;
  colorTheme: ColorTheme;
  showCloseButton?: boolean;
  closeSettingsModal?: () => void;
  updateSettings: (params: UpdateSettingsParams) => void;
}) => {
  const setLanguage = (newLanguage: LanguageCode) => {
    updateSettings({
      language: newLanguage
    });
  };

  const setUiSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUiSize = (event.target as HTMLInputElement).value as UiSize;
    updateSettings({
      uiSize: newUiSize
    });
  };

  const setColorTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColorTheme = (event.target as HTMLInputElement)
      .value as ColorTheme;
    updateSettings({
      colorTheme: newColorTheme
    });
  };

  const modalLabels = labels[language].SettingsModal;
  const languageSelectorLabels = labels[language].LanguageSelector;
  const sizeAndColorOptionsLabels = labels[language].SizeAndColorOptions;

  return (
    <>
      <FlexContainer alignItems="center" height="5rem">
        <SizeAppliedText
          textAlign="center"
          textTypeVariant="heading"
          uiSize={uiSize}
        >
          {modalLabels.title}
        </SizeAppliedText>
      </FlexContainer>
      <FlexContainer
        height="fit-content"
        alignItems="flex-start"
        flexDirection="column"
        marginTop="1rem"
        rowGap={3}
      >
        <LanguageSelect
          labels={languageSelectorLabels}
          uiSize={uiSize}
          language={language}
          setLanguage={setLanguage}
        />
        <SizeAndColorOptions
          labels={sizeAndColorOptionsLabels}
          uiSize={uiSize}
          colorTheme={colorTheme}
          setUiSize={setUiSize}
          setColorTheme={setColorTheme}
        />
      </FlexContainer>
      <FlexContainer height="fit-content">
        {showCloseButton && (
          <Button
            type="button"
            variant="contained"
            onClick={closeSettingsModal}
          >
            Close
          </Button>
        )}
      </FlexContainer>
    </>
  );
};

/* ---------------------------------- types --------------------------------- */
import { LanguageCode } from 'SettingsModule/types';

/* -------------------------------- constants ------------------------------- */
import { labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { PageContainer } from 'components/container/PageContainer';
import { LANGUAGE } from '../SettingsModule/constants';

export const LanguageSelect = ({
  language,
  setLanguage
}: {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const setupLabels = labels[language].AppSetup;

  return (
    <PageContainer marginTop="-3rem" flexDirection="column" rowGap={3}>
      <h1>{setupLabels.selectLanguage}</h1>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="select-language-label">
            {setupLabels.language}
          </InputLabel>
          <Select
            labelId="select-language-label"
            id="select-language"
            multiple
            value={[language]}
            open={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
            input={<OutlinedInput label="Language" />}
            MenuProps={MenuProps}
          >
            {Object.values(LANGUAGE).map(({ languageCode, languageLabel }) => (
              <MenuItem
                key={languageCode}
                value={languageCode}
                onClick={() => {
                  setLanguage(languageCode);
                  handleClose();
                }}
              >
                {languageLabel}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </PageContainer>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

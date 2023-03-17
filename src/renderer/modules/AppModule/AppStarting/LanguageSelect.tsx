/* ---------------------------------- types --------------------------------- */
import { LanguageCode } from 'SettingsModule/types';

/* -------------------------------- constants ------------------------------- */
import type { Labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { FlexContainer } from 'components/container/FlexContainer';
import { LANGUAGE } from '../../SettingsModule/constants';
import { HeadingLabel } from 'components/typography';
import { UiSize } from 'renderer/style/types';
import { UI_SIZE } from 'renderer/style/constants';

export const LanguageSelect = ({
  labels,
  uiSize,
  language,
  setLanguage
}: {
  labels: Labels;
  uiSize: UiSize;
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

  return (
    <FlexContainer
      marginTop="-5rem"
      height="100%"
      flexDirection="column"
      rowGap={1}
    >
      <HeadingLabel uiSize={uiSize}>{labels.pleaseSelectLanguage}</HeadingLabel>
      <FormControl sx={{ m: 1, width: formControlSize[uiSize] }}>
        <InputLabel id="select-language-label">{labels.language}</InputLabel>
        <Select
          size="medium"
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
    </FlexContainer>
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

const formControlSize = {
  [UI_SIZE.MEDIUM]: '10rem',
  [UI_SIZE.LARGE]: '12.5rem',
  [UI_SIZE.EXTRA_LARGE]: '15rem'
};

/* ---------------------------------- types --------------------------------- */
import type { LanguageCode } from 'SettingsModule/types';
import type { UiSize } from 'style/types';
import type { Labels } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { FlexContainer } from 'components/container/FlexContainer';
import { LANGUAGE } from '../../SettingsModule/constants';
import { SizeAppliedText } from 'components/typography';
import { fontSize } from 'style/theme';

/* ------------------------------------ - ----------------------------------- */

export const LanguageSelect = ({
  labels,
  uiSize,
  language,
  setLanguage
}: {
  labels: Labels['LanguageSelector'];
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
    <FlexContainer height="fit-height" flexDirection="column">
      <FlexContainer height="2.5rem">
        <SizeAppliedText textTypeVariant="menuTitle" uiSize={uiSize}>
          {labels.language}
        </SizeAppliedText>
      </FlexContainer>
      <FlexContainer height="5rem">
        <FormControl sx={{ m: 1, width: '20rem' }}>
          <Select
            labelId="select-language-label"
            id="select-language"
            value={language}
            open={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
            MenuProps={MenuProps}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: fontSize.menu[uiSize],
                height: 'fit-content',
                display: 'flex',
                alignItems: 'center'
              }
            }}
          >
            {Object.values(LANGUAGE).map(({ languageCode, languageLabel }) => (
              <MenuItem
                key={languageCode}
                value={languageCode}
                onClick={() => {
                  setLanguage(languageCode);
                }}
                sx={{
                  fontSize: fontSize.menu[uiSize]
                }}
              >
                {languageLabel}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FlexContainer>
    </FlexContainer>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '20rem'
    }
  }
};

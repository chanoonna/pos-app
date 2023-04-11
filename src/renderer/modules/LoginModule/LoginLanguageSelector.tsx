/* ---------------------------------- types --------------------------------- */
import type { LanguageCode } from 'SettingsModule/types';

/* -------------------------------- constants ------------------------------- */
import { LANGUAGE } from 'SettingsModule/constants';

/* --------------------------------- imports -------------------------------- */
import { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useAppContext } from 'renderer/modules/RootModule';

export const LoginLanguageSelector = ({
  onSelectLanguage
}: {
  onSelectLanguage: (newLanguage: LanguageCode) => void;
}) => {
  const [targetRef, setTargetRef] = useState<null | HTMLElement>(null);
  const {
    settingsState: { language: currentLanguage }
  } = useAppContext();

  const toggleLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setTargetRef((prev) => (prev ? null : event.currentTarget));
  };

  return (
    <div>
      <IconButton
        size="medium"
        aria-controls={'language-menu'}
        aria-haspopup="true"
        aria-expanded={'true'}
        onClick={toggleLanguageMenu}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={targetRef}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={Boolean(targetRef)}
        onClose={toggleLanguageMenu}
        sx={{ maxHeight: '24rem' }}
      >
        {Object.values(LANGUAGE).map(({ languageCode, languageLabel }) => (
          <MenuItem
            key={languageCode}
            onClick={(e) => {
              if (languageCode !== currentLanguage) {
                onSelectLanguage(languageCode);
              }
              toggleLanguageMenu(e);
            }}
          >
            {languageLabel}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

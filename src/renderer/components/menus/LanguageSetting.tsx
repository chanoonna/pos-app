import { useState } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useAppContext } from 'contexts/AppContextProvider';
import { Language } from 'SettingsModule/types';

export const LanguageSetting = () => {
  const [targetRef, setTargetRef] = useState<null | HTMLElement>(null);
  const { setLanguage, language: currentLanguage } = useAppContext();

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
        <TranslateIcon fontSize="medium" sx={{ color: 'white' }} />
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
        {Object.values(Language).map((language, index) => (
          <MenuItem
            key={language}
            onClick={(e) => {
              if (language !== currentLanguage) {
                setLanguage(language);
              }
              toggleLanguageMenu(e);
            }}
          >
            {language}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

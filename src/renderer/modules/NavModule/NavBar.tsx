/* -------------------------------- constants ------------------------------- */
import { labels } from './constants';
import { APP_PAGE } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import { NavSearch } from './NavSearch';
import { NavMenu } from './NavMenu';
import { useAppContext } from 'renderer/modules/AppModule';
import { TooltipTitleWrapper } from 'components/wrapper/TooltipTitleWrapper';
import { SizeAppliedText } from 'renderer/components/typography';

export const NavBar = () => {
  const [searchText, setSearchText] = useState('');
  const {
    settingsState: { language, uiSize },
    currentPage,
    logOut,
    navigateTo
  } = useAppContext();

  const isOnMainMenu = currentPage === APP_PAGE.MENU;

  const navBarLabels = labels[language].NavBar;

  const handleChangeSearchText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const onClickRightIcon = () => {
    if (isOnMainMenu) {
      logOut();
    } else {
      navigateTo(APP_PAGE.MENU);
    }
  };

  if (currentPage === APP_PAGE.LOGIN) return <div />;

  return (
    <Box
      sx={{
        flexGrow: 1,
        '.MuiToolbar-root': {
          padding: 0
        }
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <NavMenu />
          <SizeAppliedText
            component="div"
            textTypeVariant="heading"
            uiSize={uiSize}
            flexGrow={1}
          >
            Store name or Logo
          </SizeAppliedText>
          <NavSearch onChange={handleChangeSearchText} language={language} />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              mt: 2,
              mb: 2,
              ml: 2.5
            }}
          />
          <Tooltip
            title={
              <TooltipTitleWrapper
                label={
                  isOnMainMenu
                    ? navBarLabels.logoutTooltip
                    : navBarLabels.mainMenuTooltip
                }
              />
            }
            arrow
            placement="bottom-start"
          >
            <IconButton size="large" color="inherit" onClick={onClickRightIcon}>
              {isOnMainMenu ? (
                <Logout fontSize="large" />
              ) : (
                <HomeIcon fontSize="large" />
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

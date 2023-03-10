import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { colors } from 'style/theme';
import { NavSearch } from './NavSearch';
import { NavMenu } from './NavMenu';
import { useAppContext } from 'AppModule/AppContextProvider';
import { TooltipTitleWrapper } from 'components/wrapper/TooltipTitleWrapper';
import { labels } from './constants';
import { Module } from '../types';

export const NavBar = () => {
  const [searchText, setSearchText] = useState('');
  const { currentModule, language, logOut } = useAppContext();

  const navBarLabels = labels[language].NavBar;

  const handleChangeSearchText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  if (currentModule === Module.Auth) return null;

  return (
    <Box
      sx={{
        flexGrow: 1,
        '.MuiAppBar-root': {
          backgroundColor: colors.backgroundBlack4
        },
        '.MuiToolbar-root': {
          padding: 0
        }
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <NavMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Store name or Logo
          </Typography>
          <NavSearch onChange={handleChangeSearchText} language={language} />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              mt: 2,
              mb: 2,
              ml: 2.5,
              backgroundColor: colors.mediumGray1
            }}
          />
          <Tooltip
            title={<TooltipTitleWrapper label={navBarLabels.logoutTooltip} />}
            arrow
            placement="bottom-start"
          >
            <IconButton
              size="large"
              color="inherit"
              sx={{
                ':hover': {
                  color: colors.mediumBlue1
                }
              }}
              onClick={logOut}
            >
              <HomeIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

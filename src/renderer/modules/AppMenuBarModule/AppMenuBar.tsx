import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { colors } from 'style/theme';
import { AppSearchBar } from './AppSearchBar';
import { AppMenu } from './AppMenu';
import { useAppContext } from 'contexts/AppContextProvider';
import { TooltipTitleWrapper } from 'components/wrapper/TooltipTitleWrapper';
import { labels } from './constants';

export const AppMenuBar = () => {
  const [searchText, setSearchText] = useState('');
  const { language, logOut } = useAppContext();

  const appMenuBarLabels = labels[language].AppMenuBar;

  const handleChangeSearchText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        '.MuiAppBar-root': {
          backgroundColor: colors.backgroundBlack4
        }
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <AppMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Store name or Logo
          </Typography>
          <AppSearchBar onChange={handleChangeSearchText} />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              mt: 2,
              mb: 2,
              ml: 2,
              mr: 1.5,
              backgroundColor: colors.mediumGray1
            }}
          />
          <HomeIcon sx={{ mr: 1.5, cursor: 'pointer' }} />
          <Tooltip
            title={
              <TooltipTitleWrapper label={appMenuBarLabels.logoutTooltip} />
            }
            arrow
            placement="bottom-start"
          >
            <Logout onClick={logOut} sx={{ cursor: 'pointer' }} />
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

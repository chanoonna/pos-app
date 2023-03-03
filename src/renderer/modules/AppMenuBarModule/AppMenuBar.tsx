import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { colors } from 'style/theme';
import { AppSearchBar } from './AppSearchBar';
import { AppMenu } from './AppMenu';

export const AppMenuBar = () => {
  const [searchText, setSearchText] = useState('');
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
            color="#ffffff"
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              mt: 2,
              mb: 2,
              ml: 2,
              mr: 1.5,
              backgroundColor: colors.backgroundGray1
            }}
          />
          <HomeIcon sx={{ mr: 1.5 }} />
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

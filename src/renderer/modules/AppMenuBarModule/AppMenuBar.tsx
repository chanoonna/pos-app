import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

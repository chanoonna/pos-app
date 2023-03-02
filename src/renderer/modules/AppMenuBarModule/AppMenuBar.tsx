import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { colors } from 'style/theme';
import { AppSearchBar } from './AppSearchBar';

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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Store name or Logo
          </Typography>
          <AppSearchBar onChange={handleChangeSearchText} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
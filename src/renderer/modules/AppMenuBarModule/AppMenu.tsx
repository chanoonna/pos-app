import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';

import { TooltipTitleWrapper } from 'components/wrapper/TooltipTitleWrapper';
import { useAppContext } from 'contexts/AppContextProvider';
import { labels } from './constants';

export const AppMenu = () => {
  const [targetRef, setTargetRef] = useState<null | HTMLElement>(null);
  const open = Boolean(targetRef);
  const { language } = useAppContext();
  const appMenuLabels = labels[language].AppMenu;
  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setTargetRef((prev) => (prev ? null : event.currentTarget));
  };

  return (
    <>
      <Tooltip
        title={<TooltipTitleWrapper label={appMenuLabels.menuTooltip} />}
        arrow
        placement="bottom-end"
        PopperProps={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [10, -20]
              }
            }
          ]
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-controls={open ? 'app-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{ mr: 2 }}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={targetRef}
        id="app-menu"
        open={open}
        onClose={toggleMenu}
        onClick={toggleMenu}
        PaperProps={{
          elevation: 5,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 16,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem onClick={toggleMenu}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={toggleMenu}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={toggleMenu}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={toggleMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={toggleMenu}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
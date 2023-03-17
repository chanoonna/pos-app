import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';

import { TooltipTitleWrapper } from 'components/wrapper/TooltipTitleWrapper';
import { useAppContext } from 'renderer/modules/AppModule';
import { labels } from './constants';
import { colors } from 'style/theme';

export const NavMenu = () => {
  const [targetRef, setTargetRef] = useState<null | HTMLElement>(null);
  const open = Boolean(targetRef);
  const {
    user: { language },
    logOut
  } = useAppContext();
  const appMenuLabels = labels[language].NavMenu;
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
                offset: [10, 0]
              }
            }
          ]
        }}
      >
        <IconButton
          size="large"
          color="inherit"
          aria-controls={open ? 'app-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            ':hover': {
              color: colors.mediumBlue1
            }
          }}
          onClick={toggleMenu}
        >
          <MenuIcon fontSize="large" />
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
          <ListItemIcon>
            <ReceiptLongIcon />
          </ListItemIcon>
          {appMenuLabels.previousSales}
        </MenuItem>
        <MenuItem onClick={toggleMenu}>
          <ListItemIcon>
            <CreditCardOffIcon />
          </ListItemIcon>
          {appMenuLabels.cancelSale}
        </MenuItem>
        <Divider />
        <MenuItem onClick={toggleMenu}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          {appMenuLabels.myProfile}
        </MenuItem>
        <MenuItem onClick={toggleMenu}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          {appMenuLabels.settings}
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          {appMenuLabels.logout}
        </MenuItem>
      </Menu>
    </>
  );
};

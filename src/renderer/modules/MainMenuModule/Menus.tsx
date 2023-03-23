/* ---------------------------------- types --------------------------------- */
import type { ReactNode } from 'react';
import type { MenuItem } from './types';
import type { LanguageCode } from 'SettingsModule/types';

import SvgIcon from '@mui/material/SvgIcon';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PointOfSale from '@mui/icons-material/PointOfSale';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import BarChart from '@mui/icons-material/BarChart';
import Inventory from '@mui/icons-material/Inventory';

import {
  MENU_ITEMS,
  RETAIL,
  WHOLESALE,
  REPORTS,
  INVENTORY_MANAGEMENT,
  ACCOUNT_MANAGEMENT,
  labels
} from './constants';
import { MenuCard } from './MenuCard';
import { FlexContainer } from 'renderer/components/container';

export const Menues = ({ language }: { language: LanguageCode }) => {
  const menuLabels = labels[language];
  return (
    <FlexContainer width="80%" justifyContent="space-evenly" flexWrap="wrap">
      {MENU_ITEMS.map((item) => {
        return (
          <MenuCard
            key={item}
            Icon={menuItemHash[item].icon}
            label={menuLabels[item]}
          />
        );
      })}
      {/* <ListItem>
        <PointOfSale fontSize="large" sx={{ mr: 2 }} />
        <ListItemText primary="Retail" />
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ReceiptLong fontSize="large" sx={{ mr: 2 }} />
        <ListItemText primary="Whole Sale" />
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <BarChart fontSize="large" sx={{ mr: 2 }} />
        <ListItemText primary="Reports" />
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <Inventory fontSize="large" sx={{ mr: 2 }} />
        <ListItemText primary="Inventory Management" />
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <SupervisorAccount fontSize="large" sx={{ mr: 2 }} />
        <ListItemText primary="Account Management" />
      </ListItem> */}
    </FlexContainer>
  );
};

const menuItemHash: Record<
  MenuItem,
  {
    icon: typeof SvgIcon;
    name: MenuItem;
  }
> = {
  [RETAIL]: {
    icon: PointOfSale,
    name: RETAIL
  },
  [WHOLESALE]: {
    icon: ReceiptLong,
    name: WHOLESALE
  },
  [REPORTS]: {
    icon: BarChart,
    name: REPORTS
  },
  [INVENTORY_MANAGEMENT]: {
    icon: Inventory,
    name: INVENTORY_MANAGEMENT
  },
  [ACCOUNT_MANAGEMENT]: {
    icon: SupervisorAccount,
    name: ACCOUNT_MANAGEMENT
  }
};

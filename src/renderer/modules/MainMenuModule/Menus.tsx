/* ---------------------------------- types --------------------------------- */
import type { MenuItem } from './types';
import type { LanguageCode } from 'SettingsModule/types';
import type { UiSize } from 'renderer/style/types';

import SvgIcon from '@mui/material/SvgIcon';

/* --------------------------------- imports -------------------------------- */
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

/* ------------------------------------ - ----------------------------------- */

export const Menues = ({
  language,
  uiSize
}: {
  language: LanguageCode;
  uiSize: UiSize;
}) => {
  const menuLabels = labels[language];
  return (
    <FlexContainer
      height="510px"
      width="800px"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      rowGap={0}
      columnGap={2}
    >
      {MENU_ITEMS.map((item) => {
        return (
          <MenuCard
            key={item}
            Icon={menuItemHash[item].icon}
            label={menuLabels[item]}
            uiSize={uiSize}
          />
        );
      })}
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

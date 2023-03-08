import english from './english.json';
import korean from './korean.json';
import { Language } from 'SettingsModule/types';

const Component = {
  NavSearch: 'NavSearch',
  NavMenu: 'NavMenu',
  NavBar: 'NavBar'
} as const;

interface Labels {
  [Component.NavSearch]: {
    placeholder: string;
  };
  [Component.NavMenu]: {
    menuTooltip: string;
    myProfile: string;
    previousSales: string;
    settings: string;
    logout: string;
    cancelSale: string;
  };
  [Component.NavBar]: {
    logoutTooltip: string;
  };
}

export const labels: Record<Language, Labels> = {
  [Language.Kor]: korean,
  [Language.Eng]: english
};

import english from './english.json';
import korean from './korean.json';
import { LanguageCode } from 'SettingsModule/types';
import { LANGUAGE } from 'SettingsModule/constants';

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
    mainMenuTooltip: string;
  };
}

export const labels: Record<LanguageCode, Labels> = {
  [LANGUAGE.KOREAN.languageCode]: korean,
  [LANGUAGE.ENGLISH.languageCode]: english
};

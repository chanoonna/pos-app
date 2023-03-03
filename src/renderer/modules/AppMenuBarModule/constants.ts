import english from './english.json';
import korean from './korean.json';
import { Language } from 'SettingsModule/types';

const Component = {
  AppSearchBar: 'AppSearchBar',
  AppMenu: 'AppMenu'
} as const;

interface Labels {
  [Component.AppSearchBar]: {
    placeholder: string;
  };
  [Component.AppMenu]: {
    menuTooltip: string;
    myProfile: string;
    previousSales: string;
    settings: string;
    logout: string;
    cancelSale: string;
  };
}

export const labels: Record<Language, Labels> = {
  [Language.Kor]: korean,
  [Language.Eng]: english
};

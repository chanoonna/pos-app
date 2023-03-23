/* ---------------------------------- types --------------------------------- */
import type { LanguageCode } from 'SettingsModule/types';

/* -------------------------------- constants ------------------------------- */
import english from './english.json';
import korean from './korean.json';
import { LANGUAGE } from 'SettingsModule/constants';

export const RETAIL = 'retail';
export const WHOLESALE = 'wholesale';
export const REPORTS = 'reports';
export const INVENTORY_MANAGEMENT = 'inventoryManagement';
export const ACCOUNT_MANAGEMENT = 'accountManagement';

export const MENU_ITEMS = [
  RETAIL,
  WHOLESALE,
  REPORTS,
  INVENTORY_MANAGEMENT,
  ACCOUNT_MANAGEMENT
] as const;

export interface Labels {
  retail: string;
  wholesale: string;
  reports: string;
  inventoryManagement: string;
  accountManagement: string;
}

export const labels: Record<LanguageCode, Labels> = {
  [LANGUAGE.ENGLISH.languageCode]: english,
  [LANGUAGE.KOREAN.languageCode]: korean
};

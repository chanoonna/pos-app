import { UiSize, ColorTheme } from 'style/types';
import { LanguageCode } from 'SettingsModule/types';

export interface User {
  id: number;
  username: string;
  lastLogin: string;
  accessLevel: number;
}

export interface Settings {
  language: LanguageCode;
  uiSize: UiSize;
  colorTheme: ColorTheme;
}

export interface StoreInfo {
  storeName: string;
  storeAddress1: string;
  storeAddress2: string;
  storeCity: string;
  storeProvince: string;
  storePostalCode: string;
  storePhoneNumber: string;
  storeFaxNumber: string;
  storeEmail: string;
  storeWebsite: string;
}

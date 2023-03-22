/* ---------------------------------- types --------------------------------- */
import type { UiSize, ColorTheme } from 'style/types';
import type { LanguageCode } from 'SettingsModule/types';

/* ------------------------------------ - ----------------------------------- */

export interface UpdateSettingsParams {
  language: LanguageCode;
  uiSize: UiSize;
  colorTheme: ColorTheme;
}

export interface UpdateStoreInfoParams {
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

export interface CreateUserParams {
  username: string;
  password: string;
  accessLevel: number;
}

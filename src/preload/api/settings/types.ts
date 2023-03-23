import type { LanguageCode } from '../../../renderer/modules/SettingsModule/types';
import type { UiSize, ColorTheme } from '../../../renderer/style/types';

export interface UpdateSettingsParamsDB {
  language?: LanguageCode;
  ui_size?: UiSize;
  color_theme?: ColorTheme;
}

export interface SettingsDB {
  language: LanguageCode;
  ui_size: UiSize;
  color_theme: ColorTheme;
}

export interface StoreInfoDB {
  store_name: string;
  store_address1: string;
  store_address2: string;
  store_city: string;
  store_province: string;
  store_postal_code: string;
  store_phone_number: string;
  store_fax_number: string;
  store_email: string;
  store_website: string;
}

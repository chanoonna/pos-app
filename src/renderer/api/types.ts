/* ---------------------------------- types --------------------------------- */
import type { UiSize, ColorTheme } from 'style/types';
import type { LanguageCode } from 'SettingsModule/types';

/* ------------------------------------ - ----------------------------------- */

export interface UpdateSettingsParams {
  language: LanguageCode;
  uiSize: UiSize;
  colorTheme: ColorTheme;
}

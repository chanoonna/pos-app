import type { LanguageCode } from '../../../renderer/modules/SettingsModule/types';
import type { UiSize, ColorTheme } from '../../../renderer/style/types';

export interface SettingsDB {
  language: LanguageCode;
  ui_size: UiSize;
  color_theme: ColorTheme;
}

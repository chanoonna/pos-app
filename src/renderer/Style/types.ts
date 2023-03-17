/* -------------------------------- constants ------------------------------- */
import { COLOR_THEME, UI_SIZE } from 'style/constants';

export type ColorTheme = (typeof COLOR_THEME)[keyof typeof COLOR_THEME];
export type UiSize = (typeof UI_SIZE)[keyof typeof UI_SIZE];

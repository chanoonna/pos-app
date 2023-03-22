/* ---------------------------------- types --------------------------------- */
import type { SettingsDB, StoreInfoDB } from 'preload/api/settings/types';
import type { UpdateSettingsParams } from './types';

/* --------------------------------- imports -------------------------------- */
import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */
export const getSettings = () =>
  request<undefined, SettingsDB>({ action: 'getSettings' });

export const updateSettings = (params: UpdateSettingsParams) =>
  request<SettingsDB, SettingsDB>({
    action: 'updateSettings',
    params: {
      language: params.language,
      ui_size: params.uiSize,
      color_theme: params.colorTheme
    }
  });

export const getStoreInfo = () =>
  request<undefined, StoreInfoDB>({ action: 'getStoreInfo' });

export const updateStoreInfo = (params: StoreInfoDB) =>
  request<StoreInfoDB, StoreInfoDB>({ action: 'updateStoreInfo', params });

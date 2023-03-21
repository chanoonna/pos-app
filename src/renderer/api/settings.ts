/* --------------------------------- imports -------------------------------- */
import { request } from 'api/utils';
import { SettingsDB, StoreInfoDB } from 'preload/api/settings/types';

/* ------------------------------------ - ----------------------------------- */
export const getSettings = () =>
  request<undefined, SettingsDB>({ action: 'getSettings' });

export const updateSettings = (params: SettingsDB) =>
  request<SettingsDB, SettingsDB>({ action: 'updateSettings', params });

export const getStoreInfo = () =>
  request<undefined, StoreInfoDB>({ action: 'getStoreInfo' });

export const updateStoreInfo = (params: StoreInfoDB) =>
  request<StoreInfoDB, StoreInfoDB>({ action: 'updateStoreInfo', params });

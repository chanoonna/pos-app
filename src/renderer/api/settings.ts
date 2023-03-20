/* --------------------------------- imports -------------------------------- */
import { request } from 'api/utils';
import { SettingsDB } from 'preload/api/settings/types';

/* ------------------------------------ - ----------------------------------- */
export const getSettings = () =>
  request<undefined, SettingsDB>({ action: 'getSettings' });

export const updateSettings = (params: SettingsDB) =>
  request<SettingsDB, SettingsDB>({ action: 'updateSettings', params });

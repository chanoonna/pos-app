/* ---------------------------------- types --------------------------------- */
import type {
  UpdateSettingsParamsDB,
  SettingsDB,
  StoreInfoDB
} from 'preload/api/settings/types';
import type { UpdateSettingsParams, UpdateStoreInfoParams } from './types';

/* --------------------------------- imports -------------------------------- */
import { request } from 'api/utils';

/* ------------------------------------ - ----------------------------------- */
export const getSettings = () =>
  request<undefined, SettingsDB>({ action: 'getSettings' });

export const updateSettings = (params: UpdateSettingsParams) =>
  request<UpdateSettingsParamsDB, SettingsDB>({
    action: 'updateSettings',
    params: {
      language: params.language,
      ui_size: params.uiSize,
      color_theme: params.colorTheme
    }
  });

export const getStoreInfo = () =>
  request<undefined, StoreInfoDB>({ action: 'getStoreInfo' });

export const updateStoreInfo = (params: UpdateStoreInfoParams) =>
  request<StoreInfoDB, StoreInfoDB>({
    action: 'updateStoreInfo',
    params: {
      store_name: params.storeName,
      store_address1: params.storeAddress1,
      store_address2: params.storeAddress2,
      store_city: params.storeCity,
      store_province: params.storeProvince,
      store_postal_code: params.storePostalCode,
      store_phone_number: params.storePhoneNumber,
      store_fax_number: params.storeFaxNumber,
      store_email: params.storeEmail,
      store_website: params.storeWebsite
    }
  });

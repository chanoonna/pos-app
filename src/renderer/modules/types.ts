/* -------------------------------- constants ------------------------------- */
import { APP_MODULE, APP_PAGE } from './constants';

export type AppModule = (typeof APP_MODULE)[keyof typeof APP_MODULE];
export type AppPage = (typeof APP_PAGE)[keyof typeof APP_PAGE];

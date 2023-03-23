/* ---------------------------------- types --------------------------------- */
import type { AppPage } from './types';

/* -------------------------------- constants ------------------------------- */
import { APP_PAGE } from './constants';

/* --------------------------------- imports -------------------------------- */
import { Login } from 'renderer/modules/LoginModule';
import { MainMenu } from 'renderer/modules/MainMenuModule/MainMenu';

export const appPageHash: Record<AppPage, () => JSX.Element> = {
  [APP_PAGE.LOGIN]: Login,
  [APP_PAGE.MENU]: MainMenu,
  [APP_PAGE.APP_START]: () => <div />
};

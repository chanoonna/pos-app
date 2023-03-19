/* ---------------------------------- types --------------------------------- */
import type { AppPage } from './types';

/* -------------------------------- constants ------------------------------- */
import { APP_PAGE } from './constants';

/* --------------------------------- imports -------------------------------- */
import { Login } from 'renderer/modules/LoginModule';
import { Landing } from 'modules/LandingModule/Landing';

export const appPageHash: Record<AppPage, () => JSX.Element> = {
  [APP_PAGE.LOGIN]: Login,
  [APP_PAGE.MENU]: Landing,
  [APP_PAGE.APP_START]: () => <div />
};

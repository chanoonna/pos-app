/* -------------------------------- constants ------------------------------- */
import { DB_GET_LOGIN_ACTIVITIES } from 'preload/api/loginActivities/constants';

/* --------------------------------- imports -------------------------------- */
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PageContainer } from 'components/container/PageContainer';
import { colors } from 'style/theme';
import { useAppStartupState } from 'renderer/utils/requests/appStartup/useAppStartupState';
import { LanguageCode } from '../SettingsModule/types';
import { LanguageSelect } from './LanguageSelect';
import { SET_LANGUAGE } from 'utils/requests/appStartup/constants';
import { LANGUAGE } from '../SettingsModule/constants';

export const StartupMain = () => {
  const { appStartupState, connect, callApi, dispatch } = useAppStartupState();

  useEffect(() => {
    if (!appStartupState.isDatabaseConnected) {
      connect();
    }
  }, [connect, appStartupState.isDatabaseConnected]);

  useEffect(() => {
    if (appStartupState.isDatabaseReady && !appStartupState.lsatLoggedInUser) {
      callApi({
        method: 'GET',
        route: '/login_activities',
        requestAction: DB_GET_LOGIN_ACTIVITIES,
        params: {
          limit: 1,
          offset: 0,
          sortAttributes: [['date', 'DESC']]
        }
      });
    }
  }, [
    appStartupState.isDatabaseReady,
    appStartupState.lsatLoggedInUser,
    callApi
  ]);

  return (
    <PageContainer alignItems="center" flexDirection="column">
      {appStartupState.lsatLoggedInUser ? (
        <LanguageSelect
          language={
            appStartupState.lastUserSetting.language ||
            LANGUAGE.KOREAN.languageCode
          }
          setLanguage={(language: LanguageCode) => {
            dispatch({ type: SET_LANGUAGE, payload: { language } });
          }}
        />
      ) : (
        <CircularProgress
          size={38}
          thickness={5}
          sx={{ color: colors.mediumBlue1 }}
        />
      )}
    </PageContainer>
  );
};

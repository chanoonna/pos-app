/* -------------------------------- constants ------------------------------- */
import { DB_GET_LOGIN_ACTIVITIES } from 'preload/api/loginActivities/constants';

/* --------------------------------- imports -------------------------------- */
import { useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { PageContainer } from 'components/container/PageContainer';
import { colors } from 'style/theme';
import { useAppStartupState } from 'renderer/utils/requests/appStartup/useAppStartupState';
import { Language } from '../SettingsModule/types';

export const StartupMain = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    language: Language.Eng
  });
  const { appStartupState, connect, callApi } = useAppStartupState();

  console.log(state);
  console.log(appStartupState);

  useEffect(() => {
    if (!appStartupState.isDatabaseConnected) {
      connect();
    }
  }, [connect, appStartupState.isDatabaseConnected]);

  useEffect(() => {
    if (appStartupState.isDatabaseReady) {
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
  }, [appStartupState.isDatabaseReady, callApi]);

  return (
    <PageContainer alignItems="center" flexDirection="column">
      <CircularProgress
        size={38}
        thickness={5}
        sx={{ color: colors.mediumBlue1 }}
      />
    </PageContainer>
  );
};

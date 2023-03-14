/* --------------------------------- imports -------------------------------- */
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PageContainer } from 'components/container/PageContainer';
import { colors } from 'style/theme';
import { useAppStartupState } from 'renderer/utils/requests/appStartup/useAppStartupState';
import { LanguageCode } from '../SettingsModule/types';
import { LanguageSelect } from './LanguageSelect';
import { APP_STARTUP_STATUS } from 'utils/requests/appStartup/constants';
import { LANGUAGE } from '../SettingsModule/constants';

export const StartupMain = () => {
  const { appStartupState, connect, callApi, dispatch } = useAppStartupState();

  useEffect(() => {
    if (appStartupState.status === APP_STARTUP_STATUS.INITIAL_STATUS) {
      connect();
    }
  }, [connect, appStartupState.status]);

  return (
    <PageContainer alignItems="center" flexDirection="column">
      {/* {!appStartupState.lastLoggedInUser.language ? (
        <LanguageSelect
          language={LANGUAGE.ENGLISH.languageCode}
          setLanguage={(language: LanguageCode) => {
            dispatch({ type: SET_LANGUAGE, payload: { language } });
          }}
        />
      ) : ( */}
      <CircularProgress
        size={38}
        thickness={5}
        sx={{ color: colors.mediumBlue1 }}
      />
      {/* )} */}
    </PageContainer>
  );
};

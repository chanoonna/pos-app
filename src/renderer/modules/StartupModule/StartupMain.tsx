/* --------------------------------- imports -------------------------------- */
import { useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { PageContainer } from 'components/container/PageContainer';
import { colors } from 'style/theme';
import { useInitializationRequest } from 'utils/requests/initialization/useInitializationRequest';
import { Language } from '../SettingsModule/types';

export const StartupMain = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    language: Language.Eng
  });
  const { initilizationState, connect, callApi } = useInitializationRequest();

  console.log(state);
  console.log(initilizationState);

  useEffect(() => {
    if (!initilizationState.isDatabaseConnected) {
      connect();
    }
  }, [connect, initilizationState.isDatabaseConnected]);

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

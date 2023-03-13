/* --------------------------------- imports -------------------------------- */
import { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { PageContainer } from 'components/container/PageContainer';
import { colors } from 'style/theme';
import { useInitializationRequest } from 'utils/requests/initialization/useInitializationRequest';

export const StartupMain = () => {
  const { state, connect, callApi } = useInitializationRequest();

  console.log(state);

  useEffect(() => {
    if (!state.isDatabaseConnected) {
      connect();
    }
  }, [connect, state.isDatabaseConnected]);

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
